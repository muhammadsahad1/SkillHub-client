import React from "react";
import { format, isToday } from "date-fns";
import { IEvent } from "../../@types/events";
import { Clock, Calendar, User, Tag } from "lucide-react";

const OnlineEventDetails = ({ eventDetails }: { eventDetails: IEvent | undefined }) => {
  if (!eventDetails) return null;

  const eventDate = new Date(eventDetails.date);
  const formattedDate = isNaN(eventDate.getTime())
    ? "TBA"
    : isToday(eventDate)
    ? "Today"
    : format(eventDate, "MMMM d, yyyy");

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden font-poppins">
      <div className="relative h-64">
        <img
          src={eventDetails.bannerImageUrl || "/placeholder-image.jpg"}
          alt={eventDetails.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center px-4">
            {eventDetails.title}
          </h1>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-6">{eventDetails.description}</p>
        <div className="grid grid-cols-2 gap-4 font-bold">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-indigo-600" />
            <span>{eventDetails.time || "TBA"}</span>
          </div>
          <div className="flex items-center">
            <User className="w-5 h-5 mr-2 text-indigo-600" />
            <span>{eventDetails.speaker || "TBA"}</span>
          </div>
          <div className="flex items-center">
            <Tag className="w-5 h-5 mr-2 text-indigo-600" />
            <span>{eventDetails.category || "Uncategorized"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineEventDetails;