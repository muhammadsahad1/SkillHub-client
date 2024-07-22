import { createBrowserRouter } from "react-router-dom";
import UserLogin from "../page/user/UserLogin";
import SignUp from "../page/user/UserSignup";
import useGetUser from "../hook/getUser";
import Home from "../page/user/Home";
import CreateProfile from "../page/user/CreateProfile";
import { User } from "../@types/allTypes";
import { ReactElement } from "react";
import OtpForm from "../page/user/Otp";
import ResetPassword from "../components/resetPassword";
import Viewprofile from "../components/viewProfile";
import ProtectLayout from "./protectLayout";
import PublicLayout from "./PublicLayout";
// Define application routes
const routers = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path : 'auth/',
    element : <PublicLayout/>,
    children : [ 
      {
        path: "userLogin",
        element: <UserLogin />,
      },
      {
        path: "resetPassword",
        element: <ResetPassword />,
      },
      {
        path: "userSignup",
        element: <SignUp />,
      },
      {
        path: "otp",
        element: <OtpForm />,
      },
      {
        path: "createProfile",
        element: <CreateProfile/> // Conditional rendering based on user profile
      },
    ]
  },
  
  {
    path :"/auth",
    element : <ProtectLayout/>,
    children : [
      {
        path : 'viewProfile',
        element : <Viewprofile/>
      }
    ]
  },
]);

export default routers;
