import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { showToastSuccess } from '../common/utilies/toast';

const EventRegistrationCancel = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {

      showToastSuccess('Payment successful! Registration confirmed.');
    }
  }, [sessionId]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-2xl font-bold">Payment Canceled</h1>
    </div>   
  )
}

export default EventRegistrationCancel;
