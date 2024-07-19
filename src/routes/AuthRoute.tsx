// import { Navigate, Route, Routes } from "react-router-dom";
// import SignUp from "../page/user/UserSignup";
// import UserLogin from "../page/user/UserLogin";
// import OtpForm from "../page/user/Otp";
// import useGetUser from "../hook/getUser";
// import CreateProfile from "../page/user/CreateProfile";
// import Profile from "../page/user/profile";
// import PrivateRoutes from "./PrivateRoutes";

// Define the CommonRoute component
// const CommonRoutes = () => {
//   const currentUser = useGetUser();
//   return (
//     <Routes>
//       <Route path="/userSignup" element={<SignUp />} />

//       <Route path="/userLogin" element={<UserLogin />} />

//       <Route path="/otp" element={<OtpForm />} />

    

//       <Route
//         path="/viewProfile"
//         element={
//           <PrivateRoutes>
//             <Profile />
//           </PrivateRoutes>
//         }
//       />
//     </Routes>
//   );
// };

// export default CommonRoutes;
