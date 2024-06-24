import axios from "axios";
import {ADD_CONSULTATION_URL, ADD_PATIENT_URL} from "../utils/Consts";
import RequestInstance from "../utils/RequestInstance";

const addPatient = (patientName,
                    patientAgeYears,
                    patientAgeMonths,
                    patientBirthdate,
                    patientWeight,
                    patientType,
                    patientSex,
                    patientBreed,
                    patientColour,
                    patientMedicalHistoryBeforeClinic,

                    firstName,
                    lastName,
                    email,
                    address,
                    phone,
                    userId,
                    userAlreadyRegistered) => {
    return RequestInstance.post(ADD_PATIENT_URL, {
        patientName,
        patientAgeYears,
        patientAgeMonths,
        patientBirthdate,
        patientWeight,
        patientType,
        patientSex,
        patientBreed,
        patientColour,
        patientMedicalHistoryBeforeClinic,

        owner:{
            firstName : firstName,
            lastName : lastName,
            email : email,
            address : address,
            phone : phone,
            id : userId
        },
        userAlreadyRegistered
    });
};

const addConsultation = (

    patientId,
    patientName,
    patientBirthdate,
    patientWeight,
    patientType,
    patientGender,
    patientBreed,
    patientColour,

    ownerFirstName,
    ownerLastName,
    ownerEmail,
    ownerAddress,
    ownerPhone,

    consultationMainConcern,
    consultationHistoryOfConcern,
    consultationDiagnostic,
    consultationTreatment,
    consultationExtraNotes) => {
    return RequestInstance.post(ADD_CONSULTATION_URL, {
        patientId,
        patientName,
        patientBirthdate,
        patientWeight,
        patientType,
        patientGender,
        patientBreed,
        patientColour,

        ownerFirstName,
        ownerLastName,
        ownerEmail,
        ownerAddress,
        ownerPhone,

        consultationMainConcern,
        consultationHistoryOfConcern,
        consultationDiagnostic,
        consultationTreatment,
        consultationExtraNotes
    });
};

const medicService = {
    addPatient,
    addConsultation
};

export default medicService;