import React, { Suspense } from "react";
import { DotLoader } from "react-spinners";
import { RouteObject } from "react-router-dom";
import ViewMembersPage from "../../page/group/ViewMembersPage";
import ReportsRequests from "../../page/admin/ReportsRequests";
import ProtectedRoute from "../layouts/ProtectedLayout";
import NotFoundPage from "../../page/NotFoundPage";
import PrivacyInformation from "../../components/user/PrivacyInformation";
import NotificationSettings from "../../components/user/NotificationSettings";

// Layouts
const AdminLayout = React.lazy(() => import("../layouts/AdminLayout"));
const PublicLayout = React.lazy(() => import("../PublicLayout"));
const ProtectLayout = React.lazy(() => import("../protectLayout"));

// Pages - Admin
const Adminlogin = React.lazy(() => import("../../page/admin/Adminlogn"));
const AdminDashboard = React.lazy(() => import("../../page/admin/AdminDashboard"));
const UserManagement = React.lazy(() => import("../../page/admin/UserManagement"));
const EventsRequests = React.lazy(() => import("../../page/admin/EventsRequests"));
const VerificationRequestsPage = React.lazy(() => import("../../page/admin/VerificationRequests"));

// Pages - User
const UserLogin = React.lazy(() => import("../../page/user/UserLogin"));
const SignUp = React.lazy(() => import("../../page/user/UserSignup"));
const Home = React.lazy(() => import("../../page/user/Home"));
const OtpForm = React.lazy(() => import("../../page/user/Otp"));
const ResetPassword = React.lazy(() => import("../../components/user/resetPassword"));
const BlockedUserPage = React.lazy(() => import("../../page/user/BlockedUserPage"));
const SettingsPage = React.lazy(() => import("../../page/user/SettingsPage"));
// const PrivacyUserPage = React.lazy(() => import("../../page/user/PrivacyUserPage"));
// const NotificationSettingsPage = React.lazy(() => import("../../page/user/NotificationSettingsPage"));
const Profile = React.lazy(() => import("../../page/user/profile"));
const FollowingPage = React.lazy(() => import("../../page/user/FollowingPage"));
const FollowersPage = React.lazy(() => import("../../page/user/FollowersPage"));
const OtherProfileViewPage = React.lazy(() => import("../../page/user/OtherProfileViewPage"));
const OthersFollowingsPage = React.lazy(() => import("../../page/user/OthersFollowingsPage"));
const OthersFollowersPage = React.lazy(() => import("../../page/user/OthersFollowersPage"));

// Pages - Chat
const ChatPage = React.lazy(() => import("../../page/chat/ChatPage"));

// Pages - Post
const PostViewPage = React.lazy(() => import("../../page/post/PostViewPage"));

// Pages - Group
const GroupPage = React.lazy(() => import("../../page/group/GroupPage"));
const ViewGroupChatPage = React.lazy(() => import("../../page/group/ViewGroupChatPage"));

// Pages - Event
const EventsPage = React.lazy(() => import("../../page/event/EventsPage"));
const EventRegisterPage = React.lazy(() => import("../../page/event/EventRegisterPage"));
const EventMeeting = React.lazy(() => import("../../page/eventMeeting/EventMeeting"));
const EventSuccessPage = React.lazy(() => import("../../page/event/EventResterdSuccess"));

// Define application routes
const routes: RouteObject[] = [
  {
    path : "*",
    element : (
      <NotFoundPage/>
    )
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/blockedUser",
    element: (
      <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
        <BlockedUserPage />
      </Suspense>
    ),
  },
  {
    path: "auth/",
    element: (
      <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
        <PublicLayout />
      </Suspense>
    ),
    children: [
      {
        path: "userLogin",
        element: (
          <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
            <UserLogin />
          </Suspense>
        ),
      },
      {
        path: "resetPassword",
        element: (
          <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
            <ResetPassword />
          </Suspense>
        ),
      },
      {
        path: "userSignup",
        element: (
          <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
            <SignUp />
          </Suspense>
        ),
      },
      {
        path: "otp",
        element: (
          <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
            <OtpForm />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "auth/",
    element: (
      <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
        <ProtectLayout />
      </Suspense>
    ),
    children: [
      {
        path: "viewProfile",
        element: (
          <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "settings",
        element: (
          <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
            <SettingsPage />
          </Suspense>
        ),
      },
      {
        path: "privacySettings",
        element: (
          <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
            <PrivacyInformation />
          </Suspense>
        ),
      },
      {
        path: "notificationSettings",
        element: (
          <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
            <NotificationSettings />
          </Suspense>
        ),
      },
      {
        path: "followings",
        element: (
          <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
            <FollowingPage />
          </Suspense>
        ),
      },
      {
        path: "followers",
        element: (
          <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
            <FollowersPage />
          </Suspense>
        ),
      },
      {
        path: "OtherProfileView/:userId",
        element: (
          <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
            <OtherProfileViewPage />
          </Suspense>
        ),
      },
      {
        path: "OthersFollowings/:userId",
        element: (
          <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
            <OthersFollowingsPage />
          </Suspense>
        ),
      },
      {
        path: "OthersFollowers/:userId",
        element: (
          <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
            <OthersFollowersPage />
          </Suspense>
        ),
      },
      {
        path: "chat",
        element: (
          <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
            <ChatPage />
          </Suspense>
        ),
      },
      {
        path: "post/:postId",
        element: (
          <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
            <PostViewPage />
          </Suspense>
        ),
      },
      {
        path: "events",
        element: (
          <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
            <EventsPage />
          </Suspense>
        ),
      },
      {
        path: "event/:eventId",
        element: (
          <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
            <EventRegisterPage />
          </Suspense>
        ),
      },
      {
        path: "meeting/",
        element: (
          <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
            <EventMeeting />
          </Suspense>
        ),
      },
      {
        path: "event/registered/success",
        element: (
          <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
            <EventSuccessPage />
          </Suspense>
        ),
      },
      {
        path: "groups",
        element: (
          <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
            <GroupPage />
          </Suspense>
        ),
      },
      {
        path: "groupChat/:groupId",
        element: (
          <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
            <ViewGroupChatPage />
          </Suspense>
        ),
      },
      {
        path :"group/viewMembers",
        element: (
          <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
            <ViewMembersPage />
          </Suspense>
        ),
      }
    ],
  },{
    path: "admin/login",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
          <Adminlogin />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "admin/",
    element: (
      <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
        <AdminLayout />
      </Suspense>
    ),
    children: [
      
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
            <AdminDashboard />
          </Suspense>
        ),
      },
      {
        path: "ums",
        element: (
          <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
            <UserManagement />
          </Suspense>
        ),
      },
      {
        path: "events",
        element: (
          <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
            <EventsRequests />
          </Suspense>
        ),
      },
      {
        path: "verification-requests",
        element: (
          <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
            <VerificationRequestsPage />
          </Suspense>
        ),
      },
      {
        path : "reports",
        element :  (
          <Suspense fallback={<div className="flex justify-center items-center inset-0 fixed z-50"><DotLoader /></div>}>
            <ReportsRequests/>
          </Suspense>
        ),
      }
    ],
  },
];

export default routes;
