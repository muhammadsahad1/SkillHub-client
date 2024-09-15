import { useForm } from "react-hook-form";
import { validateEmail, validatePassword } from "../../utils/validation";
import sideImg from "../../assets/fix login.png";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { userLogin } from "../../API/user";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlices";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { JwtPayload } from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import { googleLogin } from "../../API/user";
import { DotLoader } from "react-spinners";
import ForgotPasswordModal from "../../components/common/utilies/ForgotPasswordModal";
import PasswordInput from "../../components/common/passwordInput";
import { showToastError } from "../../components/common/utilies/toast";

type UserData = {
  email: string;
  password: string;
};

interface CredentialPayload extends JwtPayload {
  name: string;
  email: string;
  picture: string;
}

const UserLogin: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    mode: "onChange",
  });

  const [isToast, setToast] = useState<boolean>(false);
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, SetIsModalOpen] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.get("registered") === "true" && !isToast) {
      toast.success("Registered successfully");
      setToast(true);
    }
  }, [location, isToast]);

  const onSubmit = async (data: UserData) => {
    setIsLoading(true);
    const response = await userLogin(data.email, data.password);

    if (response.message === "Your account has been blocked") {
      setIsLoading(false);
      toast.error(response.message);
      navigate("/blockedUser");
    } else if (response.success) {
      dispatch(setUser(response.user));
      navigate(`/`);
      setIsLoading(false);
    } else {
      showToastError(response.message);
      setIsLoading(false);
    }
  };

  // SUMBIT GOOGLE LOGIN (decoding token from credential to exract user information)
  const handleGoogleLogin = async (response: CredentialResponse) => {
    setIsLoading(true);
    try {
      const credentials: CredentialPayload = jwtDecode(
        response.credential as string
      );

      const gooleLoginResponse = await googleLogin(
        credentials.name,
        credentials.email,
        credentials.picture
      );

      if (gooleLoginResponse.success) {
        dispatch(setUser(gooleLoginResponse.user));
        navigate("/");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("User is not found");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // Fogot Password Model Open and close handle functions
  const openModal = () => {
    SetIsModalOpen(true);
  };

  const closeModal = () => {
    SetIsModalOpen(false);
  };

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
          <img src={sideImg} className="mb-4" />
          <div className="flex justify-center md:mt-8 ">
            <button
              className="rounded-full w-full sm:min-2xl md:w-full border-2  border-zinc-900 text-zinc-900 font-bold p-2 hover:bg-zinc-950 hover:text-zinc-100"
              onClick={() => navigate("/auth/userSignup")}
            >
              Create account
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/2  p-6 md:p-10 flex flex-col items-center justify-center">
          <h2 className="font-bold font-poppins text-2xl md:text-4xl text-zinc-900 text-center mb-5">
            Welcome Back!
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
              label="password"
              register={register}
              validation={{ validate: validatePassword }}
              errors={errors?.password}
              placeholder="Enter a password"
            />
            <button
              type="submit"
              className="rounded-full w-full bg-zinc-950 text-zinc-100 font-bold p-2 hover:bg-zinc-800 mt-4"
            >
              Log in
            </button>
          </form>
          <div className="flex justify-center items-center mt-3">
            <button
              className="rounded-full w-full sm:max-xl: md:w-full border-2 text-sm border-zinc-900 text-zinc-900 font-semibold p-2 hover:bg-zinc-950 hover:text-zinc-100"
              onClick={openModal}
            >
              Forgot Password?
            </button>
            <ForgotPasswordModal
              isOpen={isModalOpen}
              inRequestClose={closeModal}
            />
          </div>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-zinc-600 w-40"></div>
            <span className="flex-shrink mx-3 text-zinc-600">or</span>
            <div className="flex-grow border-t border-zinc-600 w-40"></div>
          </div>

          <div className="flex-col justify-center items-center flex">
            <div
              id="signupButton"
              className="google-login-button mt-0 flex justify-center w-full"
            >
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => toast.error("Login failed")}
              />
              <hr className="underline"></hr>
            </div>
            <button><Link to={'admin/login'}>Admin</Link></button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
