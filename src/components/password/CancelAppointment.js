import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from "../../services/Api";
import TimedPopup from '../popup/TimedPopup';
import './CancelAppointment.css';

const CancelAppointment = () => {
  const { appointmentId } = useParams();
  const [isCancelled, setIsCancelled] = useState(false);
  const [message, setMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    const cancelAppointment = async () => {
      try {
        const response = await api.post(`/appointments/cancel-appointment/${appointmentId}`);
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
    <>
      {isPopupVisible &&
        <TimedPopup message={message} isVisible={isPopupVisible} setIsVisible={setIsPopupVisible} timer={2000}></TimedPopup>}
      <div className="background-wrapper-cancel">
        <div className="container-cancel right-panel-active" id="container">
          <div className="content-cancel">
            <h2>{isCancelled ? 'Appointment Cancelled' : 'Cancellation Failed'}</h2>
            <p>{message}</p>
          </div>
          <div className="overlay-container">
            <div className="overlay-cancel"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CancelAppointment;
