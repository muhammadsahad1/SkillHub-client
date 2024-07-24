import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type passwordInputProps = {
  id: string;
  label: string;
  register: any;
  validation: object;
  errors: any;
  placeholder?: string;
};

const PasswordInput: React.FC<passwordInputProps> = ({
  id,
  label,
  register,
  validation,
  errors,
  placeholder,
}) => {
  const [isShowPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="mb-2 md:mb-1 w-full relative">
      <label
        className="flex justify-start text-gray-400 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="flex items-center">
        <input
          type={isShowPassword ? "text" : "password"}
          id={id}
          {...register(id, validation)}
          placeholder={placeholder}
          className="w-full rounded-lg mt-2 py-2 px-2 text-white bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
        <div
          className="absolute right-2 mt-3 cursor-pointer"
          onMouseDown={() => setShowPassword(true)}
          onMouseUp={() => setShowPassword(false)}
          onMouseLeave={() => setShowPassword(false)}
        >
          {isShowPassword ? (
            <FaEye color="white" />
          ) : (
            <FaEyeSlash color="white" />
          )}
        </div>
      </div>
      <span className="text-xs text-red-600 block h-6">
        {typeof errors?.message === "string" && errors?.message}
      </span>
    </div>
  );
};

export default PasswordInput;
