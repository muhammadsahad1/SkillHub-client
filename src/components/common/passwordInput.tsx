import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type PasswordInputProps = {
  id: string;
  label: string;
  register: any;
  validation: object;
  errors: any;
  placeholder?: string;
};

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  label,
  register,
  validation,
  errors,
  placeholder,
}) => {
  const [isShowPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="mb-4 w-full relative">
      <label
        className="block text-zinc-800 text-sm font-bold mb-1"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          type={isShowPassword ? "text" : "password"}
          id={id}
          {...register(id, validation)}
          placeholder={placeholder}
            className="w-full rounded-full py-2 px-3 font-poppins text-zinc-900 border border-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <div
          className="absolute right-3 cursor-pointer"
          onMouseDown={() => setShowPassword(true)}
          onMouseUp={() => setShowPassword(false)}
          onMouseLeave={() => setShowPassword(false)}
        >
          {id !== "confirm_password" &&
            (isShowPassword ? (
              <FaEye color="black" />
            ) : (
              <FaEyeSlash color="black" />
            ))}
        </div>
      </div>
      <span className="text-xs text-red-600 block h-6 mt-1">
        {typeof errors?.message === "string" && errors?.message}
      </span>
    </div>
  );
};

export default PasswordInput;
