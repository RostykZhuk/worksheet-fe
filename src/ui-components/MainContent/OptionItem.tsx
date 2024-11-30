import { Option } from "../../utils/DAL/api";
import { Preloader } from "../Preloader";

interface OptionItemProps {
  option: Option;
  isSelected: boolean;
  isCorrect: boolean;
  loading: boolean;
  optionNumber: number;
  selectOption: (optionId: string) => Promise<void>;
}

export const OptionItem = ({
  option,
  isSelected,
  isCorrect,
  selectOption,
  loading,
  optionNumber
}: OptionItemProps) => {
  return (
    <section
      onClick={() => {
        loading ? null : selectOption(option.id);
      }}
      className={`p-4 rounded-lg cursor-pointer transition-transform transform hover:scale-105 lg:hover:scale-102 flex justify-between items-center
        ${
          isSelected && !loading
            ? isCorrect 
              ? "bg-primary-400 bg-opacity-50 text-primary-500 border border-primary-500"
              : "bg-red-300 text-red-800 border border-red-500"
            : "bg-gray-100 border border-gray-300 hover:bg-gray-200"
        }
        `}
    >
      <div>
        <p className="font-semibold">Option {optionNumber}</p>
        <p>{option.text}</p>
      </div>
      <div>{loading && isSelected ? <Preloader size="mini" /> : null}</div>
    </section>
  );
};
