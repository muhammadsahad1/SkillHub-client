import { useForm } from "react-hook-form";
import { validateEmail, validatePassword } from "../../utils/validation";
import sideImg from "../../assets/s.png";
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
  const [loading,setLoading] = useState<boolean>(false)

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

      console.log("credentialss==>", credentials);

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
        toast.error("Google authentication failed");
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col lg:flex-row w-full max-w-screen-xl shadow-lg">
        <div
          className="hidden lg:flex lg:w-1/2 h-auto bg-cover bg-center"
          style={{ backgroundImage: `url(${sideImg})` }}
        ></div>
        <div className="w-full lg:w-1/2 bg-white p-10 flex flex-col items-center justify-center">
          {loading && <DotLoader />}
          <h2 className="text-3xl font-bold mb-8 text-center text-black">
            Welcome Back!
          </h2>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6 w-full">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { validate: validateEmail })}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <span className="text-xs text-red-600">
                {typeof errors.email?.message === "string" &&
                  errors.email?.message}
              </span>
            </div>
            <div className="mb-6 w-full">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", { validate: validatePassword })}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <span className="text-xs text-red-600">
                {typeof errors.password?.message === "string" &&
                  errors.password?.message}
              </span>
            </div>
            <button
              type="submit"
              className="w-full font-bold bg-black text-white py-3 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Login In
            </button>
          </form>
          <div className="flex justify-center items-center mt-3">
            <button
              className="font-semibold text-sm underline "
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
            </div>
            <button
              className="mt-2 underline font-bold text-sm text-zinc-900"
              onClick={() => navigate("/auth/userSignup")}>
              New here? Register Now                                                                            
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
