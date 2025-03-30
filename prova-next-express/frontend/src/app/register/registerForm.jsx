"use client";

// register page
import React, { useState } from 'react';
import { ErrorMessage, Form, Formik } from "formik";
import { object, string } from 'yup'; // Aggiungi l'import di string
import { PostFunction } from '@/lib/functions';

const message = "Campo obbligatorio!"

const schema = object({
    email: string().email("Email non valida!").required("Inserisci la mail!"),
    password: string().required("Email obbligatoria!").min(8, "Inserici almeno 8 caratteri").test('Controllo se ha ha un carttere speciale',
        (value) => /\W|_/g.test(value)), // Corretto il modo in cui usi il test
    nome: string().required(message),
    cognome: string().required(message)
})

export const RegisterForm = () => {
    const [messageApi, setMessageApi] = useState("")
    return (
        <div className='p-4'>
            <Formik
                initialValues={{ email: '', password: '', nome: '', cognome: '' }} // Aggiungi tutti i campi
                validationSchema={schema}
                onSubmit={async (values, { setSubmitting }) => {
                    const response = await PostFunction("http://localhost:8888/api/register", values)
                    setMessageApi(response)
                    setSubmitting(false);
                }}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <Form onSubmit={handleSubmit} className='input-bordati flex flex-col gap-[24px] mt-2 border w-[40%] mx-auto p-8 rounded-2xl'>
                        <h1>Crea il tuo account</h1>

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

                        <div className='input-form'>
                            <label htmlFor="nome">Nome</label>
                            <input
                                id='nome'
                                type="text"
                                name="nome"
                                onChange={handleChange}
                                value={values.nome || ''}
                            />
                            <ErrorMessage name='nome' />
                        </div>

                        <div className='input-form'>
                            <label htmlFor="cognome">Cognome</label>
                            <input
                                id='cognome'
                                type="text"
                                name="cognome"
                                onChange={handleChange}
                                value={values.cognome || ''}
                            />
                            <ErrorMessage name='cognome' />
                        </div>

                        <button type="submit" disabled={isSubmitting}>
                            Registrati
                        </button>

                        {messageApi !== "" && <div>
                            {messageApi} <br />
                            <a href="/"> Torna alla Home</a>
                        </div>}
                    </Form>
                )}
            </Formik>
        </div>
    )
}