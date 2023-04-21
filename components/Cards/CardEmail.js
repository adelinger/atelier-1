import React, { useEffect, useRef, useState } from 'react';

import ApiService from "auth/service/ApiService";
import { CircularProgress } from "@mui/material";
import Alert from "components/Alerts/Alert";

function CardEmail({ t, car = null }) {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [message, setMessage] = useState();
    const [showLoader, setShowLoader] = useState();
    const [showAlert, setShowAlert] = useState();
    const [isSuccess, setIsSuccess] = useState(false);
    const [alertMessage, setAlertMessage] = useState(t('common:email_alert_error'));
    const emailRef = useRef(null);

    useEffect(() => {
        if (car) {
            emailRef.current.scrollIntoView({ behavior: 'smooth' });
        }

    },
    );

    const onPostApiResponse = (success) => {
        setShowLoader(false);
        setIsSuccess(success);
        setShowAlert(true);
        setAlertMessage(success ? t('common:email_alert_success') : t('common:email_alert_error'))

        if (success) {
            setFirstName('');
            setLastName('');
            setEmail('');
            setMessage('');
        }
    }

    const handleSendEmail = (e) => {
        e.preventDefault();
        setShowLoader(true);

        const guestEmailObject = {};
        guestEmailObject.firstName = firstName;
        guestEmailObject.lastName = lastName;
        guestEmailObject.email = email;
        guestEmailObject.subject = car ? 'Inquiry about ' + car.carMake + ' ' + car.carModel : 'Contact from website';
        guestEmailObject.message = car ? '<h3>' + car.carMake + ' ' + car.carModel + '</h3>' + 'Inquiry about the following car: <br />' + window.location.href + '<br /> <br />' + message : message;

        const api = new ApiService();
        api
            .sendEmail(guestEmailObject)
            .then(data => {
                onPostApiResponse(true);
            })
            .catch((error) => {
                onPostApiResponse(false);
            });
    }

    return (
        <>

            <div className="w-full lg:w-6/12 px-4">
            {car &&
                <div ref={emailRef} className='mb-5'>
                    <p className='invisible'>dummy text</p>
                </div>
            }
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                    <form onSubmit={handleSendEmail}>
                        <div className="flex-auto p-5 lg:p-10">
                            {!car &&
                                <h4 className="text-2xl font-semibold">
                                    {t('common:email_form_title')}
                                </h4>
                            }

                            <div className={`relative w-full mb-3 ${car ? '-mt-5 py-5' : 'mt-8'}`}>
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="full-name"
                                >
                                    {t('common:first_name')}
                                </label>
                                <input
                                    type="text"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder={t('common:first_name')}
                                    required
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="relative w-full mb-3 ">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="full-name"
                                >
                                    {t('common:last_name')}
                                </label>
                                <input
                                    type="text"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder={t('common:last_name')}
                                    value={lastName}
                                    required
                                    onChange={e => setLastName(e.target.value)}
                                />
                            </div>

                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="email"
                                >
                                    {t('common:email')}
                                </label>
                                <input
                                    type="email"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder={t('common:email')}
                                    value={email}
                                    required
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="message"
                                >
                                    {t('common:message')}
                                </label>
                                <textarea
                                    rows="4"
                                    cols="80"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                    placeholder={t('common:message_type')}
                                    value={message}
                                    required
                                    onChange={e => setMessage(e.target.value)}
                                />
                            </div>
                            <div className="text-center mt-6">
                                <button
                                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="submit"
                                >
                                    {t('common:send_email')}
                                </button>
                            </div>
                            {showLoader &&
                                <div className=" mx-auto max-w-sm text-center relative mt-5">
                                    <CircularProgress />

                                </div>
                            }
                            {showAlert &&
                                <div className="mt-5">
                                    <Alert color={isSuccess ? 'emerald' : 'red'} message={alertMessage}></Alert>
                                </div>

                            }
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CardEmail;