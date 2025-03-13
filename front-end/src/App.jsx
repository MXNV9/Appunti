import './App.css';
import { Editbtn } from './Components/Buttons-icon/editable-btn';
import { Forato } from './Components/Buttons-no-icon/forato';
import { Plain } from './Components/Buttons-no-icon/plain';
import { Rounded } from './Components/Buttons-no-icon/rounded';
import { Card } from './Components/Cards/card';
import { Navbar } from './Components/Navbars/Navbar';
import { Navbar1 } from './Components/Navbars/Navbar-1';
import { Navbar2 } from './Components/Navbars/Navbar-2';

function App() {
  return (
    <div className="p-4">
      <h3>Componenti singoli</h3>
      <ul>
        <li>Card</li>
        <div className="my-4 flex gap-[48px]">
          <Card role='admin' titolo='Macbook Pro 16 pollici' categoria='Elettronica'/>
          <Card role='user'/>
        </div>
        <li>Bottoni testo</li>
        <div className="my-4 flex gap-[48px]">
          <div className="flex flex-col gap-[24px]">
            <h2>Dashed</h2>
            <Forato testo="Iscriviti" />
            <Forato testo="Scopri di piu" variante={2} />
            <Forato testo="Elimina" variante={3} />
          </div>
          <div className="flex flex-col gap-[24px]">
            <h2>Rounded</h2>
            <Rounded testo="Iscriviti" />
            <Rounded testo="Scopri di piu" variante={2} />
            <Rounded testo="Elimina" variante={3} />
          </div>
          <div className="flex flex-col gap-[24px]">
            <h2>Plain</h2>
            <Plain testo="Iscriviti" />
            <Plain testo="Scopri di piu" variante={2} />
            <Plain testo="Elimina" variante={3} />
          </div>
        </div>
        <li>Bottoni Icona</li>

        <div>
          <div className="my-4 flex gap-[48px]">
            <Editbtn icona='Edit' />
            <Editbtn icona='Edit' varianti='dark' />
          </div>
        </div>


        <li>Bottoni testo + icone</li>
        <li>Navbar</li>
        <div>
          <h2>Proposta 1</h2>
          <Navbar />
        </div>
        <div>
          <h2>Proposta 2</h2>
          <Navbar1 />
        </div>
        <div>
          <h2>Proposta 3</h2>
          <Navbar2 />
        </div>
        <li>Sfondo</li>
      </ul>
    </div>
  );
}

export default App;
