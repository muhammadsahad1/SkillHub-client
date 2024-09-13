import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps {
  onClick: () => void;
  isLoading: boolean;
  content: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  isLoading,
  content,
  variant = "primary",
  size = "medium",
  className = "",
  disabled = false,
}) => {
  const baseClasses =
    "font-semibold rounded-md transition-all duration-200 flex items-center justify-center";

  const variants = {
    primary:
      "bg-zinc-900 text-white hover:bg-zinc-700 focus:ring-2 focus:ring-zinc-700 focus:ring-opacity-50",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50",
    outline:
      "bg-transparent border-2 border-zinc-950 text-zinc-950 hover:bg-zinc-100 focus:ring-2 focus:ring-zinc-700 focus:ring-opacity-50",
  };

  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`${baseClasses} ${variants[variant]} ${
        sizes[size]
      } ${className} ${
        isLoading || disabled ? "opacity-70 cursor-not-allowed" : ""
      }`}
    >
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
      {content}
    </button>
  );
};

export default Button;
