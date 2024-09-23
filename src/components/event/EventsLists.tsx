import { useCallback, useEffect, useState, useRef } from "react";
import { getEventsList } from "../../API/event";
import EventsPost from "./EventsPost";
import { IEvent } from "../../@types/events";
import { Box, Typography, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

const EventsLists = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const lastElementRef = useRef<HTMLDivElement>(null);

  const  fetchEvents = useCallback(async (pageNumber: number) => {
    try {
      setLoading(true);
      const result = await getEventsList(pageNumber);
      if (result.length > 0) {
        setEvents((prevEvents) => {
          const newEvents = result.filter(
            (newEvent: IEvent) =>
              !prevEvents.some(
                (existingEvent) => existingEvent._id === newEvent._id
              )
          );
          return [...prevEvents, ...newEvents];
        });
        setHasMore(result.length === 3);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents(page);
  }, [page, fetchEvents]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }

    return () => {
      if (lastElementRef.current) {
        observer.unobserve(lastElementRef.current);
      }
    };
  }, [hasMore, loading]);

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 mt-32"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center font-poppins">
        Upcoming Events
      </h1>
      <p className="text-lg text-gray-600 mb-12 text-center">
        Explore our exciting range of upcoming events, designed to inspire and
        engage. Find details, register, and join us for an enriching experience.
      </p>
      <div>
        {events.length > 0 ? (
          events.map((event: IEvent, index: number) => (
            <EventsPost
              key={event._id}
              event={event}
              fetchEvent={fetchEvents}
              ref={index === events.length - 1 ? lastElementRef : null}
            />
          ))
        ) : (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h6" color="textSecondary">
              No upcoming events at the moment.
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              Please check back later or explore other sections of our website
              for more updates.
            </Typography>
          </Box>
        )}
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
              mb: 10,
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </div>
      {!hasMore && events.length > 0 && (
        <div className="flex justify-center items-center mb-28 mt-12">
          <Typography>
            <span className="font-bold font-poppins text-lg text-zinc-700">
              You've reached the end of our event listings. Stay tuned for more
              exciting events!
            </span>
          </Typography>
        </div>
      )}
    </motion.div>
  );
};

export default EventsLists;
