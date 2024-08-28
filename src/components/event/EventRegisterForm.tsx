import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IEvent } from "../../@types/events";
import { registerEvent } from "../../API/event";
import { IEventRegister, UserData } from "../../@types/eventRegister";
import useGetUser from "../../hook/getUser";

const EventRegisterForm = ({ event }: { event: IEvent | undefined }) => {
  const user = useGetUser()
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isPaidEvent, setIsPaidEvent] = useState();

  const onSubmit = async ({data} : {data : UserData}) => {
    if (event?._id) {
      const eventId = event?._id
      const {name , email , phone , payment } = data
      const registerData  = {
        userId : user.id,
        eventId: eventId,
        name: name,
        email: email,
        phone: phone,
        payment: payment,
    
      }
      const result = await registerEvent(registerData);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-zinc-300 rounded-lg shadow-md font-poppins">
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
            {errors.payment && (
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
