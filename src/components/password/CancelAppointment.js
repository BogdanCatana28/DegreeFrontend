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
      {isPopupVisible && (
        <TimedPopup message={message} isVisible={isPopupVisible} setIsVisible={setIsPopupVisible} timer={2000}></TimedPopup>
      )}
      <div className="background-wrapper-cancel cancel-app-form-resize">
        <div className="container-login right-panel-active" id="container">
          <div className="form-container sign-in-container">
            <form className="form-login">
              <h1>{isCancelled ? 'Appointment Cancelled' : 'Cancellation Failed'}</h1>
              <p>{message}</p>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay-CancelAppointment">
              <div className="overlay-panel overlay-right">
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CancelAppointment;
