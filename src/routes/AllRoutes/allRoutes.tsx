import { createBrowserRouter } from "react-router-dom";

// >>>>>>>>>>>>>>>>>>>>>>>>>>>> User's Routes >>>>>>>>>>>>>>>>>>>>>>>>>>>> 
import AdminLayout from "../layouts/AdminLayout";
import Adminlogin from "../../page/admin/Adminlogn";



// >>>>>>>>>>>>>>>>>>>>>>>>>>>> User's Routes >>>>>>>>>>>>>>>>>>>>>>>>>>>> 
import UserLogin from "../../page/user/UserLogin";
import SignUp from "../../page/user/UserSignup";
import Home from "../../page/user/Home";
import OtpForm from "../../page/user/Otp";
import ResetPassword from "../../components/resetPassword";
import ProtectLayout from "../protectLayout";
import PublicLayout from "../PublicLayout";
import Settings from "../../components/common/settings";
import ViewProfile from "../../components/viewProfile";



// Define application routes
const routers = createBrowserRouter([
  //User routes start here >>>>>>>>>>>>>>>>>>
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
    //Admin routes start here >>>>>>>>>>>>>>>>>>
    {
      path :'admin',
      element : <AdminLayout/>,
      children : [{
        path :'login',
        element : <Adminlogin/>
      }]
    }
  
]);

export default routers;
