import { Editbtn } from "../Buttons-icon/editable-btn"
import { Plain } from "../Buttons-no-icon/plain"

export const Card = ({ role = "admin", colore = "light", titolo = "Titolo", categoria = "Categoria", infoSecondarie = [{ "Info1": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum eius incidunt sapiente veniam aspernatur aut facilis! Voluptas dolorum eius nobis maiores quas, ea nisi eaque?", "Info2": "22-01-2025", "Info3": "Descrizione Corta" }] }) => {

    // per il debug
    // console.log(infoSecondarie)
    // come usare => {infoSecondarie["Descrizione"]}

    const roles = {
        admin: "admin",
        user: "user"
    }
    if (!roles[role]) {
        return (
            <div>
                <p className="text-red-600 font-bold">Ruolo non contemplato!</p>
            </div>
        )
    } else if (roles[role] === "admin") {
        return (
            <div className="container">
                <div className="category">{categoria}</div>
                <div className="content">
                    <div className="titolo">{titolo}</div>
                    <div className="info-secondarie" >{infoSecondarie.map((i, k) => (
                        <div className="info-secondarie-content" key={k}>
                            {console.log(i)}
                            <p>{i.Info1.slice(0, 100)}...</p>
                            <p className="text-right">{i.Info2}</p>
                        </div>
                    ))}</div>
                    <div className="flex gap-[24px] justify-between items-center">
                        <div><Plain testo="Scopri di piu" /></div>
                        <div className="flex gap-[24px]">
                            <Editbtn icona="Edit" />
                            <Editbtn icona="Trash" />
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (roles[role] === "user") {
        return (
            <div className="container">
                <div className="category">{categoria}</div>
                <div className="content">
                    <div className="titolo">{titolo}</div>
                    <div className="info-secondarie" >{infoSecondarie.map((i, k) => (
                        <div className="info-secondarie-content" key={k}>
                            {console.log(i)}
                            <p>{i.Info3}</p>
                            <p className="text-right">{i.Info2}</p>
                        </div>
                    ))}</div>
                    <div className="flex gap-[24px] justify-center items-center" >
                        <div><Plain testo="Scopri di piu" /></div>
                    </div>
                </div>
            </div>
        )
    }
}