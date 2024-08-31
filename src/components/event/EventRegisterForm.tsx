import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IEvent } from "../../@types/events";
import { registerEvent } from "../../API/event";
import { IEventRegister, UserData } from "../../@types/eventRegister";
import useGetUser from "../../hook/getUser";
import { BarLoader } from "react-spinners";
import { showToastError, showToastSuccess } from "../common/utilies/toast";

const EventRegisterForm = ({ event }: { event: IEvent | undefined }) => {
  const user = useGetUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [isPaidEvent, setIsPaidEvent] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>();

  // seting the event is paid or not
  useEffect(() => {
    if (event && Number(event.price) > 0) {
      setIsPaidEvent(true);
    }
  }, [event]);
  const onSubmit = async (data: UserData) => {
    setLoading(true);
    
    const eventId = event?._id;
    const { name, email, phone } = data;
    
    let paymentId = "Not Required";
    
    if (isPaidEvent) {
      // Handle payment process and get payment ID
      try {
        // Example payment handling function (implement according to your payment provider)
        // paymentId = await handlePayment();
      } catch (error) {
        console.error('Payment failed:', error);
        setLoading(false);
        return; // Stop the submission if payment fails
      }
    }
    
    const registerData = {
      userId: user.id,
      eventId: eventId,
      name: name,
      email: email,
      phone: phone,
      payment: paymentId,
    };
    
    try {
      const result = await registerEvent(registerData);
      console.log("Result from API call:", result);
      
      if (result?.success) {
        console.log("rss==>",result)
        showToastSuccess(result.message)
        const {joinToken} : {joinToken : string} = result

        console.log("success")
        // Handle successful registration
       navigate('/auth/events')// Redirect to a success page or show a success message
    } else {
        showToastError(result.message)
        console.error('Registration failed:', result?.message || 'Unknown error');
      }
    } catch (error : any) {
      showToastError(error.message)
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-zinc-100 rounded-lg shadow-md font-poppins">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
            <BarLoader color="black" />
          </div>
        )}
      <h2 className="text-2xl font-bold mb-4">Register for {event?.title}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">Name is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">Email is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            {...register("phone")}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {isPaidEvent && (
          <div>
            <label className="block text-sm font-semibold mb-1">
              Payment Details
            </label>
            <input
              type="text"
              {...register("payment", { required: true })}
              placeholder="Enter your payment details"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors?.payment && (
              <p className="text-red-500 text-xs mt-1">
                Payment details are required
              </p>
            )}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {isPaidEvent ? `Pay $${event?.price}` : "Register for Free"}
        </button>
      </form>
    </div>
  );
};

export default EventRegisterForm;
