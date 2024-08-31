import React, { useEffect, useState } from 'react';
import ZegoComponent from '../../components/event/ZegoComponent';
import { useLocation } from 'react-router-dom';
import { IEvent } from '../../@types/events';
import { getMettingEvent } from '../../API/event';
import useGetUser from '../../hook/getUser';

const EventMeeting = () => {
  const location = useLocation();
  const { eventId } = location.state || {};
  const currentUser = useGetUser();
  const [event, setEvent] = useState<IEvent | null>(null);

  const getEvent = async (eventId: string) => {
    try {
      console.log('Fetching event...');
      const result = await getMettingEvent(eventId);
      console.log('Event fetched:', result);
      setEvent(result);
    } catch (error) {
      console.error('Failed to fetch event:', error);
    }
  };

  useEffect(() => {
    if (eventId) {
      getEvent(eventId);
    } else {
      console.error('No eventId provided');
    }
  }, [eventId]);

  console.log("event we passingt ",event)

  if (!event || !currentUser) {
    return <div>Loading...</div>; // Or some loading spinner
  }

  return (
    <div>
      <ZegoComponent event={event} currentUser={currentUser as Required<typeof currentUser>} />
    </div>
  );
};

export default EventMeeting;
