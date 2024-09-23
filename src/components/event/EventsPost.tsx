import React, { useEffect, useState } from "react";
import { format, isToday } from "date-fns";
import { useNavigate } from "react-router-dom";
import useGetUser from "../../hook/getUser";
import { showToastError } from "../common/utilies/toast";
import toast from "react-hot-toast";
import EventEditModal from "./EventEditModal";
import { motion } from "framer-motion";
import { changeStatusEvent } from "../../API/event";
import { eventAttendees } from "../../@types/eventAttend";
import { IEvent } from "../../@types/events";

interface EventsPostProps {
  event: IEvent;
  fetchEvent: (pageNumber: number) => Promise<void>;
}

const EventPost = React.forwardRef<HTMLDivElement, EventsPostProps>(
  ({ event, fetchEvent }, ref) => {
    const navigate = useNavigate();
    const currentUser = useGetUser();
    const [isRegistered, setIsRegistered] = useState<boolean>(false);
    const [isEditEventModalOpen, setEditEventModalOpen] =
      useState<boolean>(false);

    useEffect(() => {
      if (event && currentUser) {
        const attend = event.attendees.find(
          (attended: eventAttendees) => attended.userId === currentUser.id
        );
        setIsRegistered(!!attend);
      }
    }, [event, currentUser]);

    useEffect(() => {
      const updateEventStatus = async () => {
        try {
          // Assume event.date is a Date object and event.time is a string in "HH:mm" format
          const eventDateTime = new Date(event.date);
          const [hours, minutes] = event.time.split(":").map(Number);
          eventDateTime.setHours(hours, minutes, 0, 0); // Set hours and minutes

          const currentTime = new Date();
          const endTime = new Date(
            eventDateTime.getTime() + event.duration * 60000
          );

          if (currentTime >= endTime) {
            await handleEventStateUpdate("Completed");
          } else if (currentTime >= eventDateTime) {
            await handleEventStateUpdate("Ongoing");
            const endTimerId = setTimeout(() => {
              handleEventStateUpdate("Completed");
            }, endTime.getTime() - currentTime.getTime());
            return () => clearTimeout(endTimerId);
          } else {
            await handleEventStateUpdate("Upcoming");
            const timerId = setTimeout(() => {
              handleEventStateUpdate("Ongoing");
            }, eventDateTime.getTime() - currentTime.getTime());
            return () => clearTimeout(timerId);
          }
        } catch (error) {
          console.error("Error handling event state:", error);
        }
      };

      updateEventStatus();
    }, [event.date, event.time, event.duration]);

    const handleEventStateUpdate = async (status: string) => {
      try {
        const result = await changeStatusEvent(event._id, status);
        if (result.success) {
          await fetchEvent(1);
        }
      } catch (error) {
        console.error("Error updating event status:", error);
      }
    };

    const formatDuration = (durationInMinutes: number) => {
      const hours = Math.floor(durationInMinutes / 60);
      const minutes = durationInMinutes % 60;
      return `${hours > 0 ? `${hours}h ` : ""}${minutes}m`;
    };

    const convertTo12HourFormat = (time: string): string => {
      let [hour, minute] = time.split(":").map(Number);
      let period = "AM";
      if (hour >= 12) {
        period = "PM";
        if (hour > 12) {
          hour -= 12;
        }
      } else if (hour === 0) {
        hour = 12;
      }
      return `${hour}:${minute < 10 ? "0" + minute : minute} ${period}`;
    };

    const handleNavigate = () => {
      if (isRegistered) {
        showToastError("You are already registered");
        return;
      }
      navigate(`/auth/event/${event._id}`);
    };

    const handleJoinMeeting = () => {
      // Assume event.date is already a Date object
      const eventDateTime = new Date(event.date);
      const [hours, minutes] = event.time.split(":").map(Number);
      eventDateTime.setHours(hours, minutes, 0, 0); // Set the time part on the Date object

      const currentTime = new Date();

      if (isNaN(eventDateTime.getTime())) {
        console.error("Invalid Event DateTime:", eventDateTime);
        showToastError("Invalid event date or time format.");
        return;
      }

      if (currentUser.id === event.createdBy) {
        navigate("/auth/meeting", { state: { eventId: event._id } });
      } else {
        if (isRegistered) {
          if (currentTime >= eventDateTime) {
            navigate("/auth/meeting", { state: { eventId: event._id } });
          } else {
            const formattedStartTime = convertTo12HourFormat(event.time);
            toast(
              `The event is scheduled to start at ${formattedStartTime}. Please wait until the event begins.`,
              {
                icon: "🕒",
                style: { fontFamily: "Poppins", fontSize: "16px" },
              }
            );
          }
        } else {
          showToastError("You are not registered for this event.");
        }
      }
    };

    const handleEditEventModal = () => {
      setEditEventModalOpen(true);
    };

    const handleCloseEditModal = () => {
      setEditEventModalOpen(false);
    };

    const isCreatorAndProfessional =
      currentUser.isProfessional && currentUser.id === event.createdBy;

    const eventDate = new Date(event.date);
    const formattedDate = isToday(eventDate)
      ? "TODAY"
      : format(eventDate, "dd MMM").toUpperCase();

    return (
      <motion.div
        ref={ref}
        className="flex flex-col lg:flex-row bg-zinc-100 rounded-lg shadow-lg overflow-hidden mb-10 font-poppins transform transition duration-300 hover:shadow-xl max-w-4xl mx-auto"
      >
        {event.bannerImageUrl && (
          <div className="lg:w-1/3 w-full">
            <img
              src={event.bannerImageUrl}
              alt="bannerImage"
              className="w-full h-48 lg:h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 p-4 bg-white lg:w-2/3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              <div className="font-semibold text-blue-600">{formattedDate}</div>
              <div className="text-lg font-bold text-gray-800">
                {convertTo12HourFormat(event.time)}
              </div>
              <div className="font-semibold text-blue-600">
                {event.eventStatus}
              </div>
            </div>
            {isCreatorAndProfessional && event.eventStatus !== "Completed" && (
              <div className="flex space-x-2">
                <button
                  className="text-sm text-white bg-blue-600 hover:bg-blue-700 py-1 px-3 rounded transition duration-300"
                  onClick={handleJoinMeeting}
                >
                  Join Meeting
                </button>
                {event.eventStatus != "Ongoing" && (
                  <button
                    className="text-sm text-white bg-gray-600 hover:bg-gray-700 py-1 px-3 rounded transition duration-300"
                    onClick={handleEditEventModal}
                  >
                    Edit
                  </button>
                )}
              </div>
            )}
            {isRegistered && event.eventStatus !== "Completed" && (
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
          <h3 className="text-2xl font-semibold text-gray-900 mt-2">
            {event.title}
          </h3>
          <p className="text-sm text-gray-600 mt-2">{event.description}</p>
          <div className="mt-4">
            <h4 className="text-lg font-semibold">Details</h4>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-bold">Speaker:</span> {event.speaker}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-bold">Category:</span> {event.category}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-bold">Duration:</span>{" "}
              {formatDuration(event.duration)}
            </p>
          </div>
          <div className="mt-4 flex justify-end">
            {event.eventStatus === "Ongoing" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="text-lg font-bold text-blue-900"
              >
                Ongoing
              </motion.div>
            ) : event.eventStatus === "Completed" ? (
              <p className="font-bold">Completed</p>
            ) : event.attendees.some(
                (obj: eventAttendees) => obj.userId === currentUser.id
              ) ? (
              <p className="font-bold">Registered</p>
            ) : (
              <button
                className="text-sm text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded transition duration-300"
                onClick={handleNavigate}
              >
                Register Here
              </button>
            )}
          </div>
        </div>
        {isEditEventModalOpen && (
          <EventEditModal
            isOpen={isEditEventModalOpen}
            onClose={handleCloseEditModal}
            eventData={event}
            onUpdated={fetchEvent}
          />
        )}
      </motion.div>
    );
  }
);

export default EventPost;
