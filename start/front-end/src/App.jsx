
import './App.css'
import { Forato } from './Components/Buttons/forato'
import { Rounded } from './Components/Buttons/rounded'
import { Navbar } from './Components/Navbars/Navbar'
import { Navbar1 } from './Components/Navbars/Navbar-1'
import { Navbar2 } from './Components/Navbars/Navbar-2'

function App() {

  return (
    <div className='p-4'>
      <h3>Componenti singoli</h3>
      <ul>
        <li>Card</li>
        <li>Bottoni testo</li>
        <div className='flex gap-[48px] items-center'>
          <Forato />
          <Rounded />
        </div>
        <li>Bottoni Icona</li>
        <li>Bottoni testo + icone</li>
        <li>Navbar</li>
        <div>
          proposta 1
          <Navbar />
        </div>
        <div>
          proposta 2
          <Navbar1 />
        </div>
        <div>
          proposta 3
          <Navbar2 />
        </div>
        <li>Sfondo</li>
      </ul>
    </div>
  )
}

export default App
