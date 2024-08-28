import React from "react";
import { format, isToday } from "date-fns";
import { Link, useNavigate } from "react-router-dom";

const EventPost = ({ event }: any) => {

  const navigate = useNavigate()

  const {
    _id,
    title,
    description,
    date,
    time,
    bannerImageUrl,
    registrationLink,
    speaker,
    duration,
    category,
    eventStatus,
  } = event;
  const eventDate = new Date(date);
  const formattedDate = isToday(eventDate)
    ? "TODAY"
    : format(eventDate, "dd - dd MMM").toUpperCase();

    const formatDuration = (durationInMinutes: number) => {
      const hours = Math.floor(durationInMinutes / 60);
      const minutes = durationInMinutes % 60;
      return `${hours > 0 ? `${hours}h ` : ""}${minutes}m`;
    };
  
    const handleNavigate = () => {
      navigate(`/auth/event/${_id}`)
    } 
  
  return (
    <div className="flex items-stretch bg-white rounded-lg shadow-sm overflow-hidden mb-4 font-poppins">
      <div className="w-24 bg-gray-100 p-2 flex flex-col items-center justify-center text-center">
        <div className="text-sm font-semibold">{formattedDate}</div>
        <div className="text-2xl font-bold">{time}</div>
      </div>
      <div className="flex-1 p-4 bg-zinc-100">
        {bannerImageUrl && (
          <img
            src={bannerImageUrl}
            alt="bannerImage"
            className="w-full h-32 object-cover mb-4"
          />
        )}
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <div>
          <h3 className="text-md font-semibold mb-1 mt-1">
            Speaker :
            <span className="text-gray-600 font-poppins font-bold ms-1">
              {speaker}
            </span>
          </h3>
          <h3 className="text-md font-semibold mb-1 mt-1">
            Category :
            <span className="text-gray-600 font-poppins font-bold ms-1">
              {category}
            </span>
          </h3>
          <h3 className="text-md font-semibold mb-1 mt-1">
            Duration time :
            <span className="text-gray-600 font-poppins font-bold ms-1">
              {formatDuration(duration)}
            </span>
          </h3>
        </div>
      </div>
      <div className="bg-zinc-200 flex justify-end ">
        <button className="text-zinc-900 underline font-semibold py-0 px-2 transition duration-300 " onClick={handleNavigate}>
        
          Register here
      
        </button>
      </div>
    </div>
  );
};
// border-gray-800 text-gray-800 font-poppins font-bold p-2

export default EventPost;
