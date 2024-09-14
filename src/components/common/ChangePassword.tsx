import  { useState } from "react";
import NavBar from "./navBar";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { DotLoader } from "react-spinners";
import { validatePassword } from "../../utils/validation";
import { changePassword } from "../../API/user";
import {  useNavigate } from "react-router-dom";
import PasswordInput from "./passwordInput";
import loginPunch from '../../assets/change pass.png'

const ChangePassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  type changePassword = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<changePassword>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<changePassword> = async (data) => {
    try {
      console.log(data);
      setLoading(true);
      const response = await changePassword(
        data.currentPassword,
        data.newPassword
      );
      if (response.success) {
        toast.success(response.message);
        navigate("/auth/viewProfile");
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow flex flex-col justify-center items-center py-10 px-4">
        {loading && <DotLoader color="white" />}
        <div className="flex justify-center">
          <img src={loginPunch} className="w-44" />
        </div>
        <h1 className="mt-4 font-bold text-3xl text-white">
          Change password form
        </h1>
        <div className="text-center px-4 py-10 w-full max-w-screen-md flex justify-center">
          <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
            <PasswordInput
              id="currentPassword"
              label="Password"
              register={register}
              validation={{ validate: validatePassword }}
              errors={errors?.currentPassword}
              placeholder="Enter a password "
            />
            <PasswordInput
              id="password"
              label="New password"
              register={register}
              validation={{ validate: validatePassword }}
              errors={errors?.newPassword}
              placeholder="Enter a password"
            />
            <PasswordInput
              id="confirm_password"
              label="Confirm password"
              register={register}
              validation={{
                validate: (value: any) => {
                  if (value !== watch("newPassword"))
                    return "Confirmation password should match password.";
                },
              }}
              errors={errors.confirmPassword}
              placeholder="Confirm your password"
            />
            <button className="mt-4 bg-emerald-500 font-bold  p-2 rounded-md w-full">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
