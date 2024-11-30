interface Key {
    id: string;
    taskId: string;
    correctAnswerId: string;
}

interface KeysData {
    keys: Key[];
}

export const checkAnswer = async (taskId: string, optionId: string):Promise<boolean> => {
    const { keys }: KeysData = await import('./mockData/keys.json');
    return keys.some((key: Key) => key.taskId === taskId && key.correctAnswerId === optionId);
}