import { useCallback, useState } from "react";
import { API, Task } from "../../utils/DAL/api";
import { OptionItem } from "./OptionItem";

export const WorksheetTask = ({ task, number }: { task: Task, number: number }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const selectOption = useCallback(
    async (optionId: string) => {
      setLoading(true);
      try {
        setSelectedOptionId(optionId);
        // testing delay
        if (JSON.parse(import.meta.env.VITE_IS_SINGLE_FRONTEND_MODE))
          await new Promise((resolve) => setTimeout(resolve, 2000));
        const isCorrectAnswer = await API.checkAnswer(task.id, optionId);
        setIsCorrect(isCorrectAnswer);
      } catch (error) {
        console.error("Failed to check answer: ", error);
      } finally {
        setLoading(false);
      }
    },
    [task.id]
  );
  return (
    <div className="mx-8 mt-10 mb-5 sm:mx-24 sm:mt-10 sm:mb-5 pb-20 bg-green-100 border border-gray-300 p-6 shadow-lg rounded-lg transition-transform transform hover:scale-105">
      <p className="text-primary-400 uppercase font-bold text-4xl text-center">
        Task # {number}
      </p>
      <p className=" font-bold mb-4 text-primary-500">{task.instruction}</p>
      {task.options.map((option, idx) => (
        <div key={option.id} className="mb-4 sm:mb-2">
          <OptionItem
            option={option}
            isSelected={option.id === selectedOptionId}
            isCorrect={isCorrect}
            selectOption={selectOption}
            loading={loading}
            optionNumber={idx + 1}
          />
        </div>
      ))}
    </div>
  );
};
