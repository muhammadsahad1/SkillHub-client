import React, { useEffect, useState } from "react";
import { format, isToday } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import useGetUser from "../../hook/getUser";
import { showToastError } from "../common/utilies/toast";

const EventPost = ({ event }: any) => {
  console.log("event ==>", event);
  const navigate = useNavigate();
  const currentUser = useGetUser();
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  // check the user is registered or not then update the state
  useEffect(() => {
    if (event && currentUser) {
      const attend = event.attendees.find(
        (attended: any) => attended.userId === currentUser.id
      );

      setIsRegistered(!!attend);
    }
  }, [event, currentUser]);

  console.log("isRegistered,", isRegistered);

  const {
    _id,
    title,
    description,
    date,
    time,
    bannerImageUrl,
    speaker,
    duration,
    category,
    eventStatus,
    accessLink,
    createdBy,
    agoraToken,
  } = event;

  const eventDate = new Date(date);
  const formattedDate = isToday(eventDate)
    ? "TODAY"
    : format(eventDate, "dd MMM").toUpperCase();

  const formatDuration = (durationInMinutes: number) => {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours > 0 ? `${hours}h ` : ""}${minutes}m`;
  };

  const handleNavigate = () => {
    navigate(`/auth/event/${_id}`);
  };

  const handleJoinMeeting = () => {
    if (currentUser.id === createdBy) {
      // For the creator or host
      navigate("/auth/meeting", {
        state: { eventId: _id },
      });
    } else {
      if(isRegistered){
        navigate("/auth/meeting", {
          state: { eventId: _id },
        });
      }else{
        showToastError("Your are not registered")
      }
      // Regular users - Implement the desired behavior here
    }
  };

  const isCreatorAndProfessional =
    currentUser.isProfessional && currentUser.id === createdBy;

  return (
    <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden mb-4 font-poppins transform transition duration-300 hover:shadow-xl">
      {bannerImageUrl && (
        <div className="lg:w-1/3 w-full">
          <img
            src={bannerImageUrl}
            alt="bannerImage"
            className="w-full h-48 lg:h-full object-cover"
          />
        </div>
      )}
      <div className="flex-1 p-4 bg-white">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <div className="font-semibold text-blue-600">{formattedDate}</div>
            <div className="text-lg font-bold text-gray-800">{time}</div>
          </div>
          {isCreatorAndProfessional && (
            <div className="flex space-x-2">
              <button
                className="text-sm text-white bg-blue-600 hover:bg-blue-700 py-1 px-3 rounded transition duration-300"
                onClick={handleJoinMeeting}
              >
                Join Meeting
              </button>
              <button
                className="text-sm text-white bg-gray-600 hover:bg-gray-700 py-1 px-3 rounded transition duration-300"
                onClick={() => navigate(`/auth/event/edit/${_id}`)}
              >
                Edit
              </button>
            </div>
          )}

          {isRegistered && (
            <div className="flex space-x-2">
              <button
                className="text-sm text-white bg-blue-600 hover:bg-blue-700 py-1 px-3 rounded transition duration-300"
                onClick={handleJoinMeeting}
              >
                Join Meeting
              </button>
            </div>
          )}
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mt-2">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
        <div className="mt-4">
          <h4 className="text-lg font-semibold">Details</h4>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-bold">Speaker:</span> {speaker}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-bold">Category:</span> {category}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-bold">Duration:</span>{" "}
            {formatDuration(duration)}
          </p>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="text-sm text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded transition duration-300"
            onClick={handleNavigate}
          >
            Register Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventPost;
