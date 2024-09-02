import React, { useEffect, useState } from "react";
import ZegoComponent from "../../components/event/ZegoComponent";
import { useLocation } from "react-router-dom";
import { IEvent } from "../../@types/events";
import { getMettingEvent } from "../../API/event";
import useGetUser from "../../hook/getUser";
import { BarLoader } from "react-spinners";

const EventMeeting = () => {
  const location = useLocation();
  const { eventId } = location.state || {};
  const currentUser = useGetUser();
  const [event, setEvent] = useState<IEvent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getEvent = async (eventId: string) => {
    try {
      const result = await getMettingEvent(eventId);
      setEvent(result);
      setLoading(false); // Set loading to false once the event is fetched
    } catch (error) {
      console.error("Failed to fetch event:", error);
      setLoading(false); // Also stop loading on error
    }
  };

  useEffect(() => {
    if (eventId) {
      getEvent(eventId);
    } else {
      console.error("No eventId provided");
      setLoading(false); // Stop loading if no eventId is provided
    }
  }, [eventId]);

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <BarLoader color="black" />
      </div>
    );
  }

  return (
    <div>
      <ZegoComponent
        event={event}
        currentUser={currentUser as Required<typeof currentUser>}
      />
    </div>
  );
};

export default EventMeeting;
