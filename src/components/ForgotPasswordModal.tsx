import { useState } from "react";
import Modal from "react-modal";
import { forgotPassword } from "../API/user";
import toast, { Toaster } from "react-hot-toast";

interface forgotPassowordPops {
  isOpen: boolean;
  inRequestClose: () => void;
}

const customModalStyle = {
  content: {
    top: "50%",
    left: "50%",
    background: "white",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width : "30rem",
    height : "18rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: "translate(-50%, -50%)",
  },
};

const ForgotPasswordModal: React.FC<forgotPassowordPops> = ({
  isOpen,
  inRequestClose,
}) => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSumbit = async () => {
    try {
      console.log("email ===>" ,email)
      const response = await forgotPassword(email);
      console.log("ress===>",response)
      setMessage("If the email is exists, a reset link has been sent.");
      if(response.success){
        toast.success("Reset link has been sent to your email")
        inRequestClose();
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.'); 
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={inRequestClose}
      ariaHideApp={false}
      style={customModalStyle}>

      <div className="w-auto ">
        <h1 className="font-bold font-sans text-gray-900 text-lg">Forgot Password</h1>
        <form onSubmit={handleSumbit}>
          <label>
            <h3>Email :</h3>
            <input
              className="rounded my-2 w-full p-2 border border-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button type="submit" className="bg-slate-950 text-white rounded-md p-2 w-full"> Submit </button>
        </form>
        <button className="bg-red-800 text-white rounded-md p-2 w-full mt-2" onClick={inRequestClose}> Close </button>
        {message && <p>{message}</p>}
      </div>
      <Toaster/>
    </Modal>
  );
};

export default ForgotPasswordModal;
