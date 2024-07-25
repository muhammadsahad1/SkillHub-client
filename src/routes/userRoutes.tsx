import { createBrowserRouter } from "react-router-dom";
import UserLogin from "../page/user/UserLogin";
import SignUp from "../page/user/UserSignup";
import Home from "../page/user/Home";
import CreateProfile from "../page/user/CreateProfile";
import OtpForm from "../page/user/Otp";
import ResetPassword from "../components/resetPassword";
import ProtectLayout from "./protectLayout";
import PublicLayout from "./PublicLayout";
import Settings from "../components/common/settings";
import ViewProfile from "../components/viewProfile";
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
      // {
      //   path: "createProfile",
      //   element: <CreateProfile/> // Conditional rendering based on user profile
      // },
    ]
  },
    {
      path : 'auth/',
      element : <ProtectLayout/>,
      children : [
        {
          path : 'viewProfile',
          element : <ViewProfile/>
        },
        {
        
            path : 'settings',
            element : <Settings/>
          
        }
      ]
    },
  
]);

export default routers;
