import React from "react";

interface ButtonProps {
  content: string;
  onClick?: () => void;
}

const Button:React.FC<ButtonProps> = ({ content,onClick }) => {
  return (
    <button onClick={onClick} className="border-2 border-zinc-900 px-6 py-2   hover:bg-[#4ba8f4] hover:text-white dark:text-neutral-200 transition duration-200 rounded-lg font-bold transform hover:-translate-y-1 duration-400">
      <h1 className="tracking-wide font">{content}</h1>
    </button>
  );
};

export default Button;
