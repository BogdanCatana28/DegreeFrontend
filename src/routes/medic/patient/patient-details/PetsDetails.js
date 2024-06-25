import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import requestInstance from "../../../../utils/RequestInstance";
import './PetsDetails.css';
import { useSelector } from 'react-redux';
import backgroundImage from '../../../authentication/background-login.png';
import cardBackgroundImage from './pets.jpg';
import Footer from '../../../../components/footer/Footer';

const UserPetsConsultations = () => {
  const [consultations, setConsultations] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (currentUser) {
      loadConsultations(currentUser.id);
    }
  }, [currentUser]);

  const loadConsultations = async (ownerId) => {
    try {
      const response = await requestInstance.get(`http://localhost:8080/consultations/by-owner/${ownerId}`);
      setConsultations(response.data);
    } catch (error) {
      console.error('Error loading consultations:', error);
    }
  };

  return (
    <>
      <div className='page-container' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
        <div className='content-wrapper'>
          <div className='border rounded p-4 mt-2 shadow'>
            <h2 className='text-center m-4 fs-1 fw-bold'>Your Pets Medical History at Us</h2>
            <div className='row justify-content-center'>
              {consultations.map(consultation => (
                <div className='col-12 col-md-6 mb-4' key={consultation.consultationId}>
                  <div className='card patient-card-color' style={{ backgroundImage: `url(${cardBackgroundImage})`, backgroundSize: 'cover' }}>
                    <div className='card-body'>
                      <h5 className='card-title fs-3 fw-bold'>{consultation.patientName}</h5>
                      <p className='font-patient-list fw-bold'><strong>Consultation Date:</strong> {consultation.consultationCreationDate}</p>
                      <p className='font-patient-list fw-bold'><strong>Main Concern:</strong> {consultation.consultationMainConcern}</p>
                      <p className='font-patient-list fw-bold'><strong>Diagnostic:</strong> {consultation.consultationDiagnostic}</p>
                      <p className='font-patient-list fw-bold'><strong>Treatment:</strong> {consultation.consultationTreatment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='row'>
              <div className='col text-center'>
                <Link className='btn btn-primary' to="/">Back</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserPetsConsultations;
