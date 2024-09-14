import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IEvent } from "../../@types/events";
import { makePayment, registerEvent } from "../../API/event";
import { UserData } from "../../@types/eventRegister";
import useGetUser from "../../hook/getUser";
import { BarLoader } from "react-spinners";
import { showToastError, showToastSuccess } from "../common/utilies/toast";
import {loadStripe} from '@stripe/stripe-js'

const EventRegisterForm = ({ event }: { event: IEvent | undefined }) => {
  const user = useGetUser();
  const navigate = useNavigate();
  const currentUser = useGetUser()
  const [loading, setLoading] = useState<boolean>(false);
  const [isPaidEvent, setIsPaidEvent] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>();

  useEffect(() => {
    if (event && Number(event.price) > 0) {
      setIsPaidEvent(true);
    }
  }, [event]);

  const onSubmit = async (data: UserData) => {
    const eventId = event?._id;
    const { name, email, phone } = data;
    
    if(email !== currentUser.email){
      showToastError("Email is not correct")
      return
    }
    
    setLoading(true);
    
    let paymentId = "Not Required";
    
    if (isPaidEvent) {
      try {
        const stripe = await loadStripe(import.meta.env.VITE_STRIP_PUBLIC_KEY)
        // retriving the session from strip service
        const sessionId = await makePayment(event?.price,eventId,currentUser.id)
        if(sessionId){
          //with that session go checkout page of strip
          await stripe?.redirectToCheckout({sessionId})
          paymentId = sessionId

        }
        // Handle payment process here
      } catch (error) {
        console.error('Payment failed:', error);
        setLoading(false);
        return;
      }
    }
    
    const registerData = {
      userId: user.id,
      eventId: eventId,
      name: name,
      email: email,
      phone: phone,
      paymentId: paymentId,
    };
    
    try {
      const result = await registerEvent(registerData);
      if (result?.success) {
        showToastSuccess(result.message);
        navigate('/auth/events');
      } else {
        showToastError(result?.message || 'Registration failed');
      }
    } catch (error: any) {  
      showToastError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
          <BarLoader color="black" />
        </div>
      )}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Register for Event</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
          <input
            type="email"
            {...register("email", { 
              required: "Email is required", 
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } 
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            {...register("phone")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium  text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 transition duration-150 ease-in-out"
        >
          {isPaidEvent ? `Pay $${event?.price}` : "Register for Free"}
        </button>
      </form>
    </div>
  );
};

export default EventRegisterForm;