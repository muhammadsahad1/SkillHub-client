import { createBrowserRouter } from "react-router-dom";

// >>>>>>>>>>>>>>>>>>>>>>>>>>>> User's Routes >>>>>>>>>>>>>>>>>>>>>>>>>>>>
import AdminLayout from "../layouts/AdminLayout";
import Adminlogin from "../../page/admin/Adminlogn";

// >>>>>>>>>>>>>>>>>>>>>>>>>>>> User's Routes >>>>>>>>>>>>>>>>>>>>>>>>>>>>
import UserLogin from "../../page/user/UserLogin";
import SignUp from "../../page/user/UserSignup";
import Home from "../../page/user/Home";
import OtpForm from "../../page/user/Otp";
import ResetPassword from "../../components/user/resetPassword";
import ProtectLayout from "../protectLayout";
import PublicLayout from "../PublicLayout";
import AdminDashboard from "../../page/admin/AdminDashboard";
import UserManagement from "../../page/admin/UserManagement";
import BlockedUserPage from "../../page/user/BlockedUserPage";
import SettingsPage from "../../page/user/SettingsPage";
import PrivacyUserPage from "../../page/user/PrivacyUserPage";
import NotificationSettingsPage from "../../page/user/NotificationSettingsPage";
import Profile from "../../page/user/profile";
import FollowingPage from "../../page/user/FollowingPage";
import FollowersPage from "../../page/user/FollowersPage";

// Define application routes
const routers = createBrowserRouter([
  //User routes start here >>>>>>>>>>>>>>>>>>
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/blockedUser",
    element: <BlockedUserPage />,
  },
  {
    path: "auth/",
    element: <PublicLayout />,
    children: [
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
    ],
  },
  {
    path: "auth/",
    element: <ProtectLayout />,
    children: [
      {
        path: "viewProfile",
        element: <Profile />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "privacySettings",
        element: <PrivacyUserPage />,
      },
      {
        path: "notificationSettings",
        element: <NotificationSettingsPage />,
      },
      {
        path: "followings",
        element: <FollowingPage />,
      },
      {
        path :"followers",
        element : <FollowersPage/>
      }
    ],
  },
  //Admin routes start here >>>>>>>>>>>>>>>>>>
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        path: "login",
        element: <Adminlogin />,
      },
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "ums",
        element: <UserManagement />,
      },
    ],
  },
]);

export default routers;
