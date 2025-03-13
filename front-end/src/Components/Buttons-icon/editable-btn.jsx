import React, { useState } from 'react'
import * as icon from 'lucide-react'

export const Editbtn = ({ icona = "Star", size = 22, varianti = "light" }) => {
    const Icon = icon[icona]
    if (!Icon) {
        return (
            <div>
                Elemento {icona} non presente nelle icone
            </div>
        )
    } else if (varianti === "light") {
        return (
            <div className='circle-btn'>
                <Icon size={size} />
            </div>
        )
    } else if (varianti === "dark") {
        return (
            <div className='circle-btn-dark'>
                <Icon size={size} />
            </div>
        )
    } else if (varianti !== "light" && varianti !== "dark") {
        return (
            <div className='circle-btn'>
                <Icon size={size} />
            </div>
        )
    }
}
