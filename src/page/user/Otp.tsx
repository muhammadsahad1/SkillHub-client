import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resentOtp, verifyCreateUser } from "../../API/user";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setEmail } from "../../redux/userSlices";

const OtpForm: React.FC = () => {
  const [userOtp, setUserOtp] = useState<string[]>(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState<number>(60);

  const dispatch = useDispatch()
  // TIMER For TTL 
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const location = useLocation();
  const { email } = location.state || {};

  const navigator = useNavigate();

  // handling each digit
  const handleChange = (index: number, value: string) => {

    if(!/^\d$/.test(value) && value !== ''){
      toast.error("Only digits are allowed");
      return;
    }

    const newOtp = [...userOtp];
    newOtp[index] = value;

    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-Input${index + 1}`);
      nextInput?.focus();
    }

    setUserOtp(newOtp);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const otpCode = userOtp.join("");
      if (!otpCode) {
        toast.error("Enter Valid OTP");
        return;
      }
      if (otpCode.length < 4) {
        toast.error("Enter Valid OTP");
        return;
      }
      const response = await verifyCreateUser({ email, verifyCode: otpCode });
      if (response.success) {
        dispatch(setEmail(email))
        navigator("/auth/createProfile");
      }

    } catch (error) {
      toast.error("Verification failed.");
    }
  };

  // resent OTP
  const handleResentOtp = async () => {
    if (email) {
      const response = await resentOtp(email);
      if (response.success) {
        toast.success(response.message);
        setTimeLeft(60);
      } else {
        toast.error("Something went wrong in resending OTP");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-cente text-white">
      <div className="max-w-md mx-auto text-center bg-gray-800 px-4 sm:px-8 py-10 rounded-xl shadow-lg">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-1 text-white">Email Verification</h1>
          <p className="text-lg text-gray-300">Enter the 4-digit verification code that was sent to your email: <span className="font-bold">{email}</span></p>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center gap-3 mb-6">
            {userOtp.map((digit, index) => (
              <input
                id={`otp-Input${index}`}
                key={index}
                className="w-14 h-14 text-center text-2xl font-extrabold text-gray-900 bg-gray-200 border border-gray-400 rounded-lg p-4 outline-none focus:bg-white focus:border-indigo-400"
                value={digit}
                pattern="\d*"
                maxLength={1}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            ))}
          </div>
          <div className="max-w-[250px] mx-auto mb-5">
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-500 text-white py-2 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Verify
            </button>
          </div>
        </form>
        {timeLeft > 0 ? (
          <p className="text-lg font-bold">
            Time Left: <span className="text-red-500">{timeLeft}</span>
          </p>
        ) : (
          <p className="text-lg font-bold text-red-500">
            OTP Expired. <span
              className="text-blue-500 underline cursor-pointer"
              onClick={handleResentOtp}
            >
              Please request a new one.
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default OtpForm;
