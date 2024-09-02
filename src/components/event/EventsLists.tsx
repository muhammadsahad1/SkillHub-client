import { useEffect, useState } from "react";
import { getEventsList } from "../../API/event";
import EventsPost from "./EventsPost";
import { IEvent } from "../../@types/events";

const EventsLists = () => {

  const [events, setEvents] = useState<IEvent[]>([])
  const fetchEvents = async () => {
    try {
      const result = await getEventsList();      
      setEvents(result);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 mt-32 ">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        Upcoming Events
      </h1>
      <p className="text-lg text-gray-600 mb-12 text-center">
        Explore our exciting range of upcoming events, designed to inspire and engage. Find details, register, and join us for an enriching experience.
      </p>
      <div>
        {events.map(event => (
        <EventsPost key={event?._id} event={event} fetchEvent={fetchEvents}/>
        ))}
      </div>
    </div>
  );
};

export default EventsLists;
