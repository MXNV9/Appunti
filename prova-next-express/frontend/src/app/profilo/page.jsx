"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { jwtDecode } from '@/lib/functions' 
import { DashboardProfilo } from './dashboardProfilo'

const page = () => {
    const router = useRouter()
    const [user, setUser] = useState(null)
    useEffect(() => {
        const getUser = localStorage.getItem("token") ? localStorage.getItem("token") : null
        setUser(getUser)
        !getUser ? router.push("/login") : ""
    }, []);

    if (user) {
        console.log(jwtDecode(localStorage.getItem("token")))
        const a = (jwtDecode(localStorage.getItem("token")))
        return (
            <div className='p-4'>
                <DashboardProfilo nome={a.payload.nome}/>
            </div>
        )
    } 
}

export default page