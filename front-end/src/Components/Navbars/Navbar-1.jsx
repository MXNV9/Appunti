import React from 'react'

export const Navbar1 = () => {
    return (
        <div className='flex items-center justify-between'>

            <div className='logo'>Logo</div>

            <div className='flex gap-[56px] ml-[32px]'>
                <div className='link'>link1</div>
                <div className='link'>link2</div>
                <div className='link'>link3</div>
                <div className='link'>link4</div>
                <div className='link'>link5</div>
            </div>

            <div className='flex gap-4 items-center'>
                <div className='p-2 sign rounded-3xl'>Accedi</div>
                <div className='p-2 sign-active rounded-3xl'>Registrati</div>
            </div>
        </div>
    )
}
