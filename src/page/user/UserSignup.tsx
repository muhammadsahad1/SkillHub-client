import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  validateUsername,
  validateEmail,
  validatePassword,
} from "../../utils/validation";
import signupImage from "../../assets/signup main.png";
import { userSignup } from "../../API/user";
import { DotLoader } from "react-spinners";
import PasswordInput from "../../components/common/passwordInput";

type UserData = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

const SignUp: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const check = async (user: UserData) => {
    setLoading(true);
    const response = await userSignup(user);
    if (response && response.success) {
      setLoading(false);
      navigate(`/auth/otp/`, { state: { email: user.email } });
    } else {
      toast.error(response.message);
      setLoading(false);
    }
  };

  const onSubmit = async (data: UserData) => {
    try {
      const user = {
        name: data.name || "",
        email: data.email || "",
        password: data.password || "",
        confirm_password: data.confirm_password || "",
      };
      check(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4">
      <div className="fixed inset bg-opacity-50 flex items-center justify-center z-50">
        {isLoading && <DotLoader color="black" />}
      </div>
      <div
        className={`flex flex-col md:flex-row justify-center w-full max-w-screen-lg ${
          isLoading ? "blur-sm" : ""
        }`}
      >
        <div className="w-full md:w-1/2 p-4 md:p-8 lg:p-10 flex flex-col items-center justify-center rounded-xl">
          <img
            src={signupImage}
            alt="Signup"
            className="w-full max-w-sm md:max-w-md "
          />
          <div className="flex justify-center mt-4 md:mt-8">
            <button
              className="rounded-full w-1/2 sm:min-2xl md:w-full border-2  border-zinc-900 text-zinc-900 font-bold p-2 hover:bg-zinc-950 hover:text-zinc-100"
              onClick={() => navigate("/auth/userLogin")}
            >
              Log in here
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4 md:p-8 lg:p-10 flex flex-col items-center justify-center border-2 rounded-xl">
          <h2 className="font-bold font-poppins text-2xl md:text-3xl lg:text-4xl text-zinc-900 text-center mb-5">
            Let's Get You Signed Up!
          </h2>
          <form className="w-full " onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 w-full">
              <label
                className="block text-zinc-800 text-sm font-bold mb-1"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { validate: validateUsername })}
                placeholder="Enter your name"
                className="w-full rounded-full py-2 px-3 font-poppins text-zinc-900 border border-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <span className="text-xs text-red-600 block h-6">
                {typeof errors.name?.message === "string" &&
                  errors.name?.message}
              </span>
            </div>

            <div className="mb-4 w-full">
              <label
                className="block text-zinc-800 text-sm font-bold mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { validate: validateEmail })}
                placeholder="Enter your email"
                className="w-full rounded-full py-2 px-3 font-poppins text-zinc-900 border border-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <span className="text-xs text-red-600 block h-6">
                {typeof errors.email?.message === "string" &&
                  errors.email?.message}
              </span>
            </div>

            <PasswordInput
              id="password"
              label="Password"
              register={register}
              validation={{ validate: validatePassword }}
              errors={errors?.password}
              placeholder="Enter a password"
            />

            <PasswordInput
              id="confirm_password"
              label="Confirm Password"
              register={register}
              validation={{
                validate: (value: any) => {
                  if (value !== watch("password"))
                    return "Confirmation password should match password.";
                },
              }}
              errors={errors.confirm_password}
              placeholder="Confirm your password"
            />

            <button
              type="submit"
              className="rounded-full w-full bg-zinc-950 text-zinc-100 font-bold p-2 hover:bg-zinc-800 mt-4"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
