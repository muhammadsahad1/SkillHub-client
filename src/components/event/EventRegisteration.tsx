import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEventDetails } from "../../API/event";
import { IEvent } from "../../@types/events";
import { BarLoader } from "react-spinners";
import EventRegisterForm from "./EventRegisterForm";
import OnlineEventDetails from "./OnlineEventDetails.";
import { motion } from "framer-motion";

const EventRegistration = () => {
  const [eventDetails, setEventDetails] = useState<IEvent | undefined>();
  const [loading, setLoading] = useState(false);
  const { eventId } = useParams();

  const fetchDetails = async () => {
    if (!eventId) {
      console.error("No eventId provided");
      return;
    }
    try {
      setLoading(true);
      const event = await fetchEventDetails(eventId);
      setEventDetails(event);
    } catch (error) {
      console.error("Error fetching event details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchDetails();
    }
  }, [eventId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BarLoader color="#4F46E5" />
      </div>
    );
  }

  return (
    <motion.div className="container mx-auto px-4 py-8 mt-28"
    initial = {{ opacity : 0,y : 20}}
    animate ={{ opacity : 8 , y : 0}}
    transition={{duration : 0.5}}
    >
      <div className="flex flex-col lg:flex-row justify-center gap-8">
        <div className="flex-1 mb-8 lg:mb-0 lg:max-w-2xl">
          {/* Event Details - takes more space */}
          <OnlineEventDetails eventDetails={eventDetails} />
        </div>
        <div className="w-full lg:w-96">
          <EventRegisterForm event={eventDetails} />
        </div>
      </div>
    </motion.div>
  );
};

export default EventRegistration;
