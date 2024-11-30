import { axiosInstance } from "./axiosSettings"
import { checkAnswer } from "../checkAnswer";
import { handleAnswer } from "../handleAnswer";
import { AxiosResponse } from 'axios';

export interface Option {
    id: string;
    text: string;
}

export interface Task {
    id: string;
    instruction: string;
    options: Option[];
}

export interface WorksheetTasksData {
    tasks: Task[];
}

const isSingleFrontendMode = JSON.parse(import.meta.env.VITE_IS_SINGLE_FRONTEND_MODE)

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const res = await API.getSessionToken();
                const { sessionToken } = res.data;
                sessionStorage.setItem('sessionToken', sessionToken);
                console.log(sessionToken, ' - sessionToken');

                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${sessionToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${sessionToken}`;
                return axiosInstance(originalRequest);
            } catch (err) {
                console.error('Failed to refresh token: ', err);
                throw err;
            }
        }
        throw error;
    }
);

export const API = {
    getSessionToken: async (): Promise<AxiosResponse<{ sessionToken: string }>> => {
        return await axiosInstance.get('/tokens');
    },
    getWorksheetTasks: async (): Promise<WorksheetTasksData> => {
        if (isSingleFrontendMode)
            return await import('../mockData/mockData.json') as WorksheetTasksData
        else {
            try {
                const response = await axiosInstance.get<WorksheetTasksData>('/worksheet-tasks');
                return response.data;
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || 'Failed to fetch worksheet tasks';
                throw new Error(errorMessage);
            }
        }
    },
    checkAnswer: async (taskId: string, optionId: string): Promise<boolean> => {
        if (isSingleFrontendMode) {
            handleAnswer(taskId, optionId);
            return await checkAnswer(taskId, optionId);
        } else try {
            const response = await axiosInstance.post<{correct: boolean}>(`/answers/${taskId}`, {
                optionId
            }, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('sessionToken')}`
                }
            });
            return response.data.correct;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to submit answer';
            throw new Error(errorMessage);
        }

    }
}