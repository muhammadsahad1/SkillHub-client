import { toast } from "react-hot-toast";

const showToastSuccess = (message: string) => {
  toast.success(message, {
    duration: 4000, // Duration in milliseconds
    style: {
      borderRadius: "10px",
      background: "#18181B",
      color: "#fff",
      animation: "slideIn 0.5s, slideOut 0.5s 3.5s",
    },
  
  });
};

const showToastError = (message: string) => {
  toast.error(message, {
    duration: 4000, // Duration in milliseconds
    style: {
      borderRadius: "10px",
      background: "#FF4F4F",
      color: "#fff",
      animation: "slideIn 0.5s, slideOut 0.5s 3.5s",
    },

  });
};

export { showToastSuccess, showToastError };