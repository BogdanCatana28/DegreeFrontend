import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TimedPopup from '../popup/TimedPopup';

const CancelAppointment = () => {
  const { appointmentId } = useParams();
  const [isCancelled, setIsCancelled] = useState(false);
  const [message, setMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    const cancelAppointment = async () => {
      try {
        const response = await axios.post(`/appointments/cancel-appointment/${appointmentId}`);
        setIsCancelled(true);
        setMessage(response.data || 'Your appointment has been cancelled successfully.');
      } catch (error) {
        setIsCancelled(false);
        setMessage(error.response?.data?.message || 'There was an error cancelling your appointment.');
        console.error('Error cancelling appointment:', error);
      } finally {
        setIsPopupVisible(true);
      }
    };

    cancelAppointment();
  }, [appointmentId]);

  return (
    <div className="cancel-appointment-container">
      {isPopupVisible &&
        <TimedPopup message={message} isVisible={isPopupVisible} setIsVisible={setIsPopupVisible} timer={2000}></TimedPopup>}
      <h2>{isCancelled ? 'Appointment Cancelled' : 'Cancellation Failed'}</h2>
      <p>{message}</p>
    </div>
  );
};

export default CancelAppointment;
