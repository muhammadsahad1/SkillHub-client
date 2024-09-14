import { useState } from "react";
import Modal from "react-modal";
import { forgotPassword } from "../../../API/user";
import toast from "react-hot-toast";
import { validateEmail } from "../../../utils/validation";
import { useForm } from "react-hook-form";
import { BarLoader } from "react-spinners";
import fogotimage from "../../../assets/forgot.webp";

interface forgotPassowordPops {
  isOpen: boolean;
  inRequestClose: () => void;
}

const customModalStyle = {
  content: {
    top: "50%",
    left: "50%",
    background: "#09090b",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "30rem",
    border: "0",
    height: "22rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    background: "rgba(0,0,0,0.44)",
  },
};

const ForgotPasswordModal: React.FC<forgotPassowordPops> = ({
  isOpen,
  inRequestClose,
}) => {

  const [isLoading,setLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    mode: "onChange",
  });

  const onsubmit = async (email: string) => {
    try {
      setLoading(true)
      const response = await forgotPassword(email);

      if (response.success) {
        toast.success("Reset link has been sent to your email");
        inRequestClose();
      } else {
        toast.error(response.message);
      }
      setLoading(false)
    } catch (error) {
      toast.success("An error occurred. Please try again later.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={inRequestClose}
      ariaHideApp={false}
      style={customModalStyle}
    >
      <div className="w-auto ">
      {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
            <BarLoader color="black" />
          </div>
        )}
        <div className="flex justify-center">
          <img src={fogotimage} className="w-24" />
        </div>
        <h1 className="font-bold font-sans text-center text-lg text-white">
          Forgot Password
        </h1>
        <form onSubmit={handleSubmit(onsubmit)}>
          <label className="mt-2 font-bold">
            <h3 className=" text-gray-400">Email :</h3>
            <input
              className="w-full text-white rounded-lg mt-2 py-2 px-2 bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              id="email"
              {...register("email", { validate: validateEmail })}
            />
            <span className="text-xs text-red-600">
              {typeof errors.email?.message === "string" &&
                errors.email?.message}
            </span>
          </label>
          <button
            type="submit"
            className="mt-3 bg-emerald-500 text-white rounded-md p-2 w-full"
          >
            Submit
          </button>
        </form>
        <button
          className="  text-gray-50 underline border-none p-2 w-full mt-2"
          onClick={inRequestClose}
        >
          you know the password?
        </button>
      </div>
    </Modal>
  );
};

export default ForgotPasswordModal;
