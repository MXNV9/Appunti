"use client";
// login
import React, { useState } from 'react';
import { ErrorMessage, Form, Formik, replace } from "formik";
import { object, string } from 'yup'; // Aggiungi l'import di string
import { LoginFuncion } from '@/lib/functions';

const message = "Campo obbligatorio!"

// lelloBello@gmail.com MarioSturnio22!

const schema = object({
    email: string().email("Email non valida!").required(message),
    password: string().required(message).min(8, "Inserici almeno 8 caratteri").test('Controllo se ha ha un carttere speciale',
        (value) => /\W|_/g.test(value)), // Corretto il modo in cui usi il test
})

export const LoginForm = () => {
    const [messageApi, setMessageApi] = useState("")
    const [attemptRemaining, setAttemptRemaining] = useState(null)
    return (
        <div className='p-4'>
            <Formik
                initialValues={{ email: 'lelloBello@gmail.com', password: 'MarioSturnio22!' }} // Aggiungi tutti i campi
                validationSchema={schema}
                onSubmit={async (values, { setSubmitting }) => {
                    const response = await LoginFuncion("http://localhost:8888/api/login", values)

                    if (response?.token) {
                        localStorage.setItem("token", response.token);
                    }
                    setMessageApi(response.msg)
                    setAttemptRemaining(response.remaining ? "Tentativi rimasti: " + response.remaining : "")
                    setSubmitting(false)
                }}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <Form onSubmit={handleSubmit} className='input-bordati flex flex-col gap-[24px] mt-2 border w-[40%] mx-auto p-8 rounded-2xl justify-between'>
                        <h1>Accedi</h1>
                        <div className='input-form'>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id='email'
                                onChange={handleChange}
                                value={values.email}
                            />
                            <ErrorMessage name='email' />
                        </div>

                        <div className='input-form'>
                            <label htmlFor="password">Password</label>
                            <input
                                id='password'
                                type="password"
                                name="password"
                                onChange={handleChange}
                                value={values.password}
                            />
                            <ErrorMessage name='password' />
                        </div>

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Caricamento..." : "Accedi"}
                        </button>

                        {messageApi !== "" && <div>
                            {messageApi} {attemptRemaining} <br />
                            <a href="/"> Torna alla Home</a>
                        </div>}
                    </Form>
                )}
            </Formik>
        </div>
    )
}
