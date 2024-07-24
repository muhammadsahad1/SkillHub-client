import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  validateUsername,
  validateEmail,
  validatePassword,
} from "../../utils/validation";
import signupImage from "../../assets/sideImage.png";
import { useState } from "react";
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
    mode: "onChange",
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
      console.log(user);
      check(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col md:flex-row items-center justify-center">
      <div className="flex flex-col md:flex-row justify-end w-full max-w-screen-lg max-h-screen shadow-lg shadow-zinc-800 ">
      <div className="w-1/2" style={{ backgroundImage: `url(${signupImage})`, backgroundSize: 'cover',backgroundPosition : 'center' }}></div>  <div className="w-full md:w-1/2 p-4 md:p-10 flex flex-col items-center justify-center sm:p-10 shadow-xl">
          {isLoading && <DotLoader color="white" />}
          <h2 className="md:text-3xl font-bold text-3xl text-white text-center mb-5">
            Join SkillHub and Share Your Skills!
          </h2>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2 md:mb-1 w-full">
              <label
                className="block text-gray-400 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { validate: validateUsername })}
                placeholder="Enter your name"
                className="w-full rounded-lg mt-2 py-2 px-2 text-white bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
              <span className="text-xs text-red-600 block h-6">
                {typeof errors.name?.message === "string" &&
                  errors.name?.message}
              </span>
            </div>

            <div className="mb-2 md:mb-1 w-full">
              <label
                className="block text-gray-400 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { validate: validateEmail })}
                placeholder="Enter your email"
                className="w-full rounded-lg mt-2 py-2 px-2 text-white bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
              <span className="text-xs text-red-600 block h-6">
                {typeof errors.email?.message === "string" &&
                  errors.email?.message}
              </span>
            </div>

            <PasswordInput
              id="password"
              label="password"
              register={register}
              validation={{ validate: validatePassword }}
              errors={errors?.password}
              placeholder="Enter a password "
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
              className="bg-emerald-500 font-bold p-2 rounded-md w-full hover:bg-emerald-400"
            >
              Signup
            </button>
          </form>
          <button
            className="text-gray-200 mt-2 underline font-bold"
            onClick={() => navigate("/auth/userLogin")}
          >
            Already registered?
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
