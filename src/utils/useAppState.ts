import { useEffect, useState } from "react";
import { API, WorksheetTasksData } from "./DAL/api";

export const useAppState = () => {
    const [tasks, setTasks] = useState<WorksheetTasksData>({ tasks: [] });
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        const getData = async () => {
            setErrorMessage('');
            setLoading(true);
            try {
                if (!JSON.parse(import.meta.env.VITE_IS_SINGLE_FRONTEND_MODE)) {
                    const token: string | null = sessionStorage.getItem('sessionToken');
                    if (!token) {
                        const { data } = await API.getSessionToken();
                        console.log(data.sessionToken, ' - sessionToken');
                        
                        sessionStorage.setItem('sessionToken', data.sessionToken);
                    }
                }
                const worksheetTasks: WorksheetTasksData = await API.getWorksheetTasks();
                setTasks(worksheetTasks);
            } catch (error: any) {
                console.error('Error fetching data: ', error);
                setErrorMessage(error.response?.data.message || 'Error fetching data');
            } finally {
                // testing delay
                if (JSON.parse(import.meta.env.VITE_IS_SINGLE_FRONTEND_MODE))
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                else
                    setLoading(false);
            }
        };

        getData();
    }, []);

    return { tasks, loading, errorMessage };
}