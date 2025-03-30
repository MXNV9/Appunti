"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export const Navbar = () => {
    const router = useRouter()
    const [isLogged, setIsLogged] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem("token")
            setIsLogged(token ? true : false)
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token")
        setIsLogged(false)
        router.push("/")
    }

    return (
        <div className='flex items-center gap-[24px] p-4'>
            <Link href={"/"}>Home</Link>
            <Link href={"/profilo"}>Profilo</Link>
            {!isLogged ? (
                <div>
                    <Link href={"/login"}> Login </Link>
                    <Link href={"/register"}> Register </Link>
                </div>) : (
                <button onClick={() => handleLogout()}> Log out </button>)}
        </div>
    )
}
