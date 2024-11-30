interface AnswerRecord {
    taskId: string;
    optionId: string;
}


export const handleAnswer = (taskId: string, optionId: string): void => {
    const currentRecordsString: string | null = sessionStorage.getItem('answerRecords');
    const currentRecords: AnswerRecord[] = currentRecordsString ? JSON.parse(currentRecordsString) : [];
    let shouldAddRecord = true;

    currentRecords.forEach((record: AnswerRecord) => {
        if (record.taskId === taskId) {
            record.optionId = optionId;
            shouldAddRecord = false;
        }
    });

    
    if (shouldAddRecord) {
        const newRecord: AnswerRecord = { taskId, optionId };
        currentRecords.push(newRecord);
    }
    sessionStorage.setItem('answerRecords', JSON.stringify(currentRecords));
};

