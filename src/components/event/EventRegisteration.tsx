import React, { useEffect, useState } from "react";
import { fetchEventDetails } from "../../API/event";
import { IEvent } from "../../@types/events";
import { format, isToday } from "date-fns";
import { useParams } from "react-router-dom";
import EventRegisterForm from "./EventRegisterForm";

const EventRegisteration = () => {
  const [eventDetails, setEventDetails] = useState<IEvent | undefined>();
  const { eventId } = useParams();

  const fetchDetails = async () => {
    if (!eventId) {
      console.error("No eventId provided");
      return;
    }
    try {
      const event = await fetchEventDetails(eventId);
      setEventDetails(event);
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchDetails();
    }
  }, [eventId]);

  const eventDate = new Date(eventDetails?.date || "");
  const formattedDate = isNaN(eventDate.getTime())
    ? "INVALID DATE"
    : isToday(eventDate)
    ? "TODAY"
    : format(eventDate, "dd MMM").toUpperCase();

  const formatDuration = (durationInMinutes: number) => {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours > 0 ? `${hours}h ` : ""}${minutes}m`;
  };

  return (
    <div className="flex justify-evenly">
      <div className="flex items-stretch bg-zinc-100 rounded-lg shadow-sm overflow-hidden mb-4 font-poppins mt-32  w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
        <div className="w-28 bg-zinc-300 p-2 flex flex-col items-center justify-center text-center">
          <div className="text-sm font-semibold">{formattedDate}</div>
          <div className="text-lg font-bold">
            {eventDetails?.time || "UNKNOWN TIME"}
          </div>
        </div>
        <div className="flex-1 p-4 bg-zinc-200">
          {eventDetails?.bannerImageUrl ? (
            <img
              src={eventDetails?.bannerImageUrl}
              alt="bannerImage"
              className="w-full h-32 object-cover mb-4 rounded-lg"
            />
          ) : (
            <div className="w-full h-32 bg-gray-200 mb-4 rounded-lg flex items-center justify-center">
              No Image
            </div>
          )}
          <h3 className="text-xl font-semibold mb-2">{eventDetails?.title}</h3>
          <p className="text-sm text-gray-600 mb-4">
            {eventDetails?.description}
          </p>
          <div>
            <h3 className="text-md font-semibold mb-2">
              Speaker:{" "}
              <span className="text-gray-600 font-bold">
                {eventDetails?.speaker || "UNKNOWN"}
              </span>
            </h3>
            <h3 className="text-md font-semibold mb-2">
              Category:{" "}
              <span className="text-gray-600 font-bold">
                {eventDetails?.category || "UNKNOWN"}
              </span>
            </h3>
            <h3 className="text-md font-semibold mb-2">
              Duration:{" "}
              <span className="text-gray-600 font-bold">
                {formatDuration(eventDetails?.duration || 0)}
              </span>
            </h3>
          </div>
        </div>
      </div>
      <div className="mt-32">
      
        <EventRegisterForm event={eventDetails} />
      </div>
    </div>
  );
};

export default EventRegisteration;
