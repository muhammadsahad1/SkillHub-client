import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DotLoader } from "react-spinners";
import { validateEmail, validatePassword } from "../../utils/validation";
import adminLogo from "../../assets/admin Logomain.png";
import PasswordInput from "../../components/common/passwordInput";
import { adminLogin } from "../../API/admin";
import toast from "react-hot-toast";
import { setUser } from "../../redux/userSlices";
import { useDispatch } from "react-redux";
import useGetUser from "../../hook/getUser";
import { useNavigate } from "react-router-dom";

const Adminlogin = () => {
  console.log("admin login page");
  
  const [isloading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  type userData = {
    email: string;
    password: string;
  };

  const onSubmit = async (data: userData) => {
    setLoading(true);
    try {
    
      const response = await adminLogin(data.email, data.password);
      console.log("ress after ==>",response);
      
      if (response.success) {
        toast.success(response.message);
        dispatch(setUser(response.admin));
        navigate('/admin/dashBoard')
      } else {
        toast.error(response?.message);
      }
    } catch (error: any) {
      if(error.response && error.response.data && error.response.data.message){
        toast.error(error.response.data.message)
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  console.log("Current Admin => ",useGetUser())
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4">
      <div className="fixed inset bg-opacity-50 flex items-center justify-center z-50">
        {isloading && <DotLoader color="black" />}
      </div>
      <div
        className={`flex flex-col md:flex-row justify-center w-full max-w-screen-lg  ${
          isloading ? "blur-sm" : ""
        }`}
      >
        <div className="w-full md:w-1/2 p-4 md:p-8 lg:p-10 flex flex-col items-center justify-center rounded-xl">
          <img src={adminLogo} className="mb-4" />
        </div>
        <div className="w-full lg:w-1/2  p-6 md:p-10 flex flex-col items-center justify-center">
          <h2 className="font-bold font-poppins text-2xl md:text-4xl text-zinc-900 text-center mb-5">
            Welcome Admin!
          </h2>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2 md:mb-1 w-full lg:mb-3">
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
                className="w-full rounded-full py-3 px-3 font-poppins text-zinc-900 border border-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <span className="text-xs text-red-600">
                {typeof errors.email?.message === "string" &&
                  errors.email?.message}
              </span>
            </div>
            <PasswordInput
              id="password"
              label="New password"
              register={register}
              validation={{ validate: validatePassword }}
              errors={errors?.newPassword}
              placeholder="Enter a password"
            />
            <button
              type="submit"
              className="rounded-full w-full bg-zinc-950 text-zinc-100 font-bold p-2 hover:bg-zinc-800 mt-4"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Adminlogin;
