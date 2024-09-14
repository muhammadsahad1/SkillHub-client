
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
        <div className="w-full lg:w-1/2  p-6 md:p-10 flex flex-col items-start justify-start">
          <h1 className="font-poppins font-bold text-3xl text-red-600 md:text-4xl text-center mb-5">
            <span className="text-zinc-900">Account</span> Blocked
          </h1>
          <p className="text-gray-700 mb-4 font-semibold">
            Your account has been temporarily blocked due to a violation of our
            community guidelines.
          </p>
          <h2 className="text-zinc-950 font-bold mb-2">
            Reason: Violation of our community guidelines.
          </h2>
          <h2 className="text-zinc-950 font-bold">
            If you believe this was a mistake, please contact our support team
            at support{" "}
            <a
              href="mailto:muhammadsahad2022@gmail.com"
              className="cursor-pointer text-blue-600"
            >
              muhammadsahad2022@gmail.com
            </a>
            .
          </h2>
        </div>
      </div>
    </div>
  );
};

export default BlockedUserPage;
