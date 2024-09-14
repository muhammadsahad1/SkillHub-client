
import CheckBoxBtn from "../common/CheckBoxBtn";
import { showNotification } from "../../API/user";
import { useDispatch } from "react-redux";
import { setShowNotificationChange } from "../../redux/userSlices";
import toast from "react-hot-toast";
import useGetUser from "../../hook/getUser";

const NotificationSettings = () => {
  const dispatch = useDispatch()
  const currentUser = useGetUser()
  const isShow = currentUser?.showNotification

  const changeShowNotification = async () => {
    try {
      const status = !isShow
      const result = await showNotification(status)
      if(result.success){
         dispatch(setShowNotificationChange(result.status))
      }
    } catch (error: any ) {
      console.log(error)
      toast.error(error.message)
    }
  };

  return (
    <div className="w-full flex justify-center items-center mt-28 flex-col md:flex-row md:space-x-5">
      <div className="w-1/2 shadow-md rounded-mg p-6 mb-7 border bottom-12 border-">
        <h1 className="font-poppins font-bold mb-4 text-3xl">
          Notification settings
        </h1>
        <CheckBoxBtn
          label={"Show notification"}
          isChecked={isShow}
          onChange={changeShowNotification}
        />
      </div>
    </div>
  );
};

export default NotificationSettings;
