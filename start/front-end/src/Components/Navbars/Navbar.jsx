import { User } from 'lucide-react'

export const Navbar = () => {
    return (
        <div className="flex gap-[24px] items-center justify-between">

            <div className='logo'>Prova d'Esame</div>

            <div className="flex gap-[24px] items-center">
                <div className='p-2 link'> link 1 </div>
                <div className='p-2 link'> link 2 </div>
                <div className='p-2 link'> link 3 </div>
                <div className='p-2 link'> link 4 </div>
                <div className='p-2 icon-link'> <User size={36} /> </div>
            </div>
        </div>
    )
}