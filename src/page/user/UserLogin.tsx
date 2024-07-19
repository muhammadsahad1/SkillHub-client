import { useForm } from "react-hook-form";
import { validateEmail, validatePassword } from "../../utils/validation";
import sideImg from "../../assets/s.png";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { userLogin } from "../../API/user";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/userSlices";
import { User } from "../../@types/allTypes";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { JwtPayload } from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import { googleLogin } from "../../API/user";
import { DotLoader } from "react-spinners";

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
  const [isloading,setIsLoading] = useState<boolean>(false)
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: User) => state);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.get("registered") === "true" && !isToast) {
      toast.success("Registered successfully");
      setToast(true);
    }
  }, [location, isToast]);

  const onSubmit = async (data: UserData) => {
    setIsLoading(true)
    const response = await userLogin(data.email, data.password);
    console.log("response===", response);
    if (response.success) {
      console.log(response);
      navigate(`/`);
      setIsLoading(false)
    } else {
      setIsLoading(false)
      toast.error(response.message);
    }
  };

  // SUMBIT GOOGLE LOGIN (decoding token from credential to exract user information)
  const handleGoogleLogin = async (response: CredentialResponse) => {
    setIsLoading(true)
    try {
      const credentials: CredentialPayload = jwtDecode(
        response.credential as string
      );

      console.log("credentialss==>",credentials)

      const gooleLoginResponse = await googleLogin(
        credentials.name,
        credentials.email,
        credentials.picture
      );

      console.log("google respo",gooleLoginResponse)

      if (gooleLoginResponse.success) {
        dispatch(setUser(gooleLoginResponse.user))
        navigate('/')
        setIsLoading(false)
      }else{
        setIsLoading(false)
        toast.error("Google authentication failed")
      }
    } catch (error :any) {
        toast.error(error.message)
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col lg:flex-row w-full max-w-screen-xl shadow-lg">
        {/* Left side: Image */}
        <div
          className="hidden lg:flex lg:w-1/2 h-auto bg-cover bg-center"
          style={{ backgroundImage: `url(${sideImg})` }}
>
          {/* Background image for the left side */}
        </div>
        {/* Right side: Login Form */}
        <div className="w-full lg:w-1/2 bg-white p-10 flex flex-col items-center justify-center">
        { isloading && <DotLoader/>}
          <h2 className="text-3xl font-bold mb-8 text-center text-black">
            Welcome Back!
          </h2>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6 w-full">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="email"
              >
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
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Login In
            </button>

            <div id="signupButton" className="mt-4 flex justify-center ">
              <GoogleLogin onSuccess={handleGoogleLogin} />
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default UserLogin;
