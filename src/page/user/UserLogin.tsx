import { useForm } from "react-hook-form";
import { validateEmail, validatePassword } from "../../utils/validation";
import sideImg from "../../assets/loo.jpg"
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { userLogin } from "../../API/user";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlices";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { JwtPayload } from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import { googleLogin } from "../../API/user";
import { DotLoader } from "react-spinners";
import ForgotPasswordModal from "../../components/ForgotPasswordModal";
import PasswordInput from "../../components/common/passwordInput";

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
  } = useForm({
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

    if (response.success && response.user.profile) {
      console.log(response);
      dispatch(setUser(response.user));
      navigate(`/`);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast.error(response.message);
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
    <div className="min-h-screen bg-zinc-950 flex flex-col md:flex-row items-center justify-center">
      <div className="flex flex-col md:flex-row justify-end w-full max-w-screen-lg max-h-screen shadow-lg shadow-zinc-800 ">
        <div className="w-1/2" style={{backgroundImage:`url(${sideImg})`,backgroundSize : 'cover',backgroundPosition : 'center'}}></div>
          <div className="w-full lg:w-1/2  p-6 md:p-10 flex flex-col items-center justify-center">
            {isloading && <DotLoader color="white"/>}
            <h2 className="md:text-3xl font-bold text-3xl text-white text-center mb-5 mt-2">
              Welcome Back!
            </h2>
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
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
                  className="w-full rounded-lg mt-2 py-2 px-2 bg-zinc-900 focus:outline-none focus:ring-2 text-white focus:ring-emerald-500"
                  required
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
                className="bg-emerald-500 font-bold mt-4 p-2 rounded-md w-full hover:bg-emerald-400"
              >
                Login In
              </button>
            </form>
            <div className="flex justify-center items-center mt-3">
              <button
                className="font-semibold text-sm underline text-gray-200"
                onClick={openModal}
              >
                Forgot Password?
              </button>
              <ForgotPasswordModal
                isOpen={isModalOpen}
                inRequestClose={closeModal}
              />
            </div>
            <hr className="text-gray-950" />
            <div className="flex-col justify-center items-center flex">
              <div
                id="signupButton"
                className="google-login-button mt-4 flex justify-center w-full"
              >
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => toast.error("Login failed")}
                />
                <hr className="underline"></hr>
              </div>
              <button
                className="mt-2 underline font-bol text-sm text-gray-200"
                onClick={() => navigate("/auth/userSignup")}
              >
                New here? Register Now
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default UserLogin;
