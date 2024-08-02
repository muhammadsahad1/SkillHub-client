import React from "react";
import { ClipLoader } from "react-spinners";

interface ButtonProps {
  content: string;
  onClick?: () => void;
  isLoading: boolean;
}

const Button: React.FC<ButtonProps> = ({ content, onClick, isLoading }) => {
  return (
    <button 
    onClick={onClick}
    className="border-2 border-zinc-900 px-6 py-2 flex items-center justify-center w-28 h-11 hover:bg-[#4ba8f4] hover:text-white dark:text-neutral-200 transition duration-200 rounded-lg font-bold transform hover:-translate-y-1 duration-400"
  >
    {isLoading ? (
      <ClipLoader color="#fff" size={24} />
    ) : (
      <h1 className="tracking-wide">{content}</h1>
    )}
    </button>
  );
};

export default Button;
