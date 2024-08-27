import React, { useEffect, useState } from "react";
import { getEventsList } from "../../API/event";
import EventsPost from "./EventsPost";
import { result } from "lodash";

const EventsLists = () => {
  const [events, setEvents] = useState<{ [key: string]: string }>({});

  const fetchEvents = async () => {
    try {
      const result = await getEventsList();
      setEvents(result);
    } catch (error) {}
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {events.map((event: any) => (
        <EventsPost key={event._id} event={event} />
      ))}
    </Box>
  );
};

export default EventsLists;
