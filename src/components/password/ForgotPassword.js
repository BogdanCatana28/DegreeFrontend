import React from "react";
import {useDispatch, useSelector} from "react-redux";
// import { useHistory } from "react-router-dom";
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";
import {sendPasswordResetEmailAction} from "../../slices/Auth";
import {clearMessage} from "../../slices/Message";
import {setMessage} from "../../slices/Message";
import "./ForgotPassword.css";
import TimedPopup from "../popup/TimedPopup";
import api from "../../services/Api";

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const {successMessage, errorMessage} = useSelector((state) => state.auth);
    const [isPopupVisible, setIsPopupVisible] = React.useState(false);
    const [popupMessage, setPopupMessage] = React.useState("");
    const [successful, setSuccessful] = React.useState(false);

    const initialValues = {
        email: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email format").required("Email is required"),
    });

    async function forgotPassword(email) {
        const response = await api.post("auth/generate-password-reset-token", {
            email,
        });
        return response;
    }


    const handleForgotPassword = (formValues) => {
        const {email} = formValues;

        forgotPassword(email)
            .then(() => {
                console.log("Password reset email sent successfully");
                setIsPopupVisible(true)
                setPopupMessage("Password reset email sent successfully.")
                setSuccessful(true)

            })
            .catch((error) => {
                setIsPopupVisible(true)
                setPopupMessage("Error sending password reset email:" + error.response.data.message)
                setSuccessful(false)
            });
    };

    return (
        <>
            {isPopupVisible && (
                <TimedPopup message={popupMessage} isVisible={isPopupVisible} setIsVisible={setIsPopupVisible}
                            messageType={successful ? "success" : "error"}></TimedPopup>)}
            <div className="background-wrapper-forgor forgot-pass-form-resize">
                <div className="container-login right-panel-active" id="container">
                    <div className="form-container sign-in-container">

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleForgotPassword}
                        >
                            {({errors, touched}) => (
                                <Form className="form-login">
                                    <h1>Forgot Password</h1>
                                    <div className="form-group">

                                        <Field
                                            name="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            className={
                                                "form-control-forgor custom-input" +
                                                (errors.email && touched.email ? " is-invalid" : "")
                                            }
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="invalid-feedback"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <button type="submit" className="custom-button-forgor">
                                            <span>Send Reset Email</span>
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        {successMessage && (
                            <div className="alert alert-success" role="alert">
                                {successMessage}
                            </div>
                        )}
                        {errorMessage && (
                            <div className="alert alert-danger" role="alert">
                                {errorMessage}
                            </div>
                        )}
                    </div>
                    <div class="overlay-container">
                        <div class="overlay-ForgorPassword">
                            <div class="overlay-panel overlay-right">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
