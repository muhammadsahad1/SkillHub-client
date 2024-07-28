import React from "react";
import blockImg from "../../assets/blockedPageIcon.png";

const BlockedUserPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4">
      <div className="fixed inset bg-opacity-50 flex items-center justify-center z-50">
        {/* {isloading && <DotLoader color="black" />} */}
      </div>
      <div
        className={`flex flex-col md:flex-row justify-center w-full max-w-screen-lg  ${
          false ? "blur-sm" : ""
        }`}
      >
        <div className="w-full md:w-1/2 p-4 md:p-8 lg:p-10 flex flex-col items-center justify-center rounded-xl">
          <img src={blockImg} className="mb-4 " />
        </div>
        <div className="w-full lg:w-1/2  p-6 md:p-10 flex flex-col items-center justify-center">
          <h1 className="font-poppins font-bold text-3xl text-red-600 md:text-4xl text-center mb-5">
            <span className="text-zinc-900">Account</span> Blocked
          </h1>
          <p className="text-gray-700 mb-4 font-semibold">
          Your account has been temporarily blocked due to a violation of our community guidelines.
        </p>
        </div>
      </div>
    </div>
    // <div className='flex justify-center'>
    //   <div className='bg-zinc-100 p-8 rounded-lg shadow max-w-md w-full text-center'>
    //     <h1 className='font-poppins font-bold text-3xl text-red-600'><span className='text-zinc-950'>Account</span> Blocked</h1>
    //     <img src={blockImg} alt="blockLogo" className='w'/>
    //   </div>
    // </div>
  );
};

export default BlockedUserPage;
