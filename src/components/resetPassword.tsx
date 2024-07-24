import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { validatePassword } from "../utils/validation";
import { resetPassword } from "../API/user";
import { useNavigate } from "react-router-dom";
import toast  from "react-hot-toast";
import { DotLoader } from "react-spinners";
import NavBar from "./common/navBar";

const ResetPassword = () => {
  const [token,setToken] = useState<string>('')
  const [loading,setLoading] = useState<boolean>(false)
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const resetToken = query.get('resetToken');
  const navigate = useNavigate()

  type PasswordForm = {
    password: string;
    confirmPassword: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordForm>({
    mode: "onBlur",
  });

  useEffect( () => {
    if(resetToken){
      setToken(resetToken)
    }
  }, [resetToken]);

  const onSubmit: SubmitHandler<PasswordForm> = async (data) => {
    setLoading(true)
      const passwordToken = {
        password : data.password,
        resetToken : token
      }

      const response = await resetPassword(passwordToken)
      if(response.success){
        toast.success(response?.message)
        navigate('/auth/userLogin')
      }else {
        toast.error('not valid user')
      }
      setLoading(false)
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow flex flex-col justify-center items-center py-10 px-4 bg-zinc-950">
      { loading && <DotLoader color="white"/>}
        <h1 className="mt-4 font-bold text-3xl text-white">Reset Password Form</h1>
        <div className="text-center px-4 py-10 w-full max-w-screen-md flex justify-center">
          <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 w-full">
              <label className="font-bold flex justify-start text-gray-400">
                New Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  validate: validatePassword,
                })}
                placeholder="Enter your password"
                className="w-full rounded-lg mt-2 py-2 px-2 bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="w-full mb-4">
              <label className="font-bold flex justify-start text-gray-400">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                placeholder="Confirm your password"
                className="w-full rounded-lg mt-2 py-2 px-2 bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <button className="mt-4 bg-emerald-500 font-bold  p-2 rounded-md w-full">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
