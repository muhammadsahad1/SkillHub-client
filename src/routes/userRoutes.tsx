import { createBrowserRouter } from "react-router-dom";
import UserLogin from "../page/user/UserLogin";
import SignUp from "../page/user/UserSignup";
import useGetUser from "../hook/getUser";
import Home from "../page/user/Home";
import CreateProfile from "../page/user/CreateProfile";
import { User } from "../@types/allTypes";
import { ReactElement } from "react";
import OtpForm from "../page/user/Otp";

// Component that renders Home or CreateProfile based on user profile
const GetCurrentUserElement = (): ReactElement => {
  const currentUser: User = useGetUser();
  if (currentUser.profile === false) {
    return <CreateProfile />;
  } else if (currentUser.profile === true) {
    return <Home />;
  }
};

// Define application routes
const routers = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "auth/userLogin",
    element: <UserLogin />,
  },
  {
    path: "auth/userSignup",
    element: <SignUp />,
  },
  {
    path: 'auth/otp/',
    element: <OtpForm/>
  },
  {
    path: "/auth/createProfile",
    element: <GetCurrentUserElement />, // Conditional rendering based on user profile
  },
]);

export default routers;
