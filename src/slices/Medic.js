import {createSlice, createAsyncThunk, isFulfilled} from "@reduxjs/toolkit";
import { setMessage } from "./Message";

import medicService from "../services/MedicService";

const initialState = {

    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
}

export const addPatient = createAsyncThunk(
    "addPatient",
    async ({

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

               firstName,
               lastName,
               email,
               address,
               phone,
               userId,
               userAlreadyRegistered}, thunkAPI) => {
        try {
            const response = await medicService.addPatient(

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

                firstName,
                lastName,
                email,
                address,
                phone,
                userId,
                userAlreadyRegistered);

            thunkAPI.dispatch(setMessage(response.data.message));
            return response.data;
        } catch (error) {
            const message = (error.response && error.response.data.message && error.response.data) ||
                             error.message ||
                             error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);

export const addConsultation = createAsyncThunk(
    "addConsultation",
    async ({

               patientId,
               patientName,
               patientBirthdate,
               patientWeight,
               patientType,
               patientSex,
               patientBreed,
               patientColour,

               ownerFName,
               ownerLName,
               ownerEmail,
               ownerAddress,
               ownerPhone,

               consultMainConcern,
               historyOfConcern,
               consultDiagnostic,
               consultTreatment,
               consultExtraNotes }, thunkAPI) => {
        try {
            const response = await medicService.addConsultation(

                patientId,
                patientName,
                patientBirthdate,
                patientWeight,
                patientType,
                patientSex,
                patientBreed,
                patientColour,

                ownerFName,
                ownerLName,
                ownerEmail,
                ownerAddress,
                ownerPhone,

                consultMainConcern,
                historyOfConcern,
                consultDiagnostic,
                consultTreatment,
                consultExtraNotes);

            thunkAPI.dispatch(setMessage(response.data.message));
            return response.data;
        } catch (error) {
            const message = (error.response && error.response.data.message && error.response.data) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);

const medicSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {

        [addPatient.fulfilled]: (state, action) => {

        },
        [addPatient.rejected]: (state, action) => {

        },

        [addConsultation().fulfilled]: (state, action) => {

        },
        [addConsultation.rejected]: (state, action) => {

        }
    }
});

const { reducer } = medicSlice;
export default reducer;

