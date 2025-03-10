import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { PutQuery } from "./putQuery"
import { DeleteQuery } from "./deleteQuery"

export const GetQuery = () => {
    // Stato per tenere traccia dell'utente da modificare o eliminare
    const [editingUser, setEditingUser] = useState({
        id: null,
        nome: "",
        citta: "",
        modifica: false,
        elimina: false
    })

    // Funzione per il fetch dei dati
    const fetchData = async () => {
        try {
            const response = await axios.get("https://67cf4036823da0212a81f120.mockapi.io/api/v1/Users")
            return response.data
        } catch (error) {
            throw new Error("Errore nel database, endpoint non funzionante")
        }
    }

    // Query
    const { data, isError, isLoading, error } = useQuery({
        queryKey: ["users"],
        queryFn: fetchData,
    })

    // Funzione per reset dello stato di editing
    const resetEditing = () => {
        setEditingUser({
            id: null,
            nome: "",
            citta: "",
            modifica: false,
            elimina: false
        })
    }

    return (
        <div className="users-container">
            {isLoading && <p>Caricamento in corso...</p>}
            {isError && <p style={{ color: "red" }}>Errore: {error.message}</p>}

            {data?.map((user) => (
                <div key={user.id} className="user-card">
                    <div className="user-info">
                        <p>Nome: {user.name}</p>
                        <p>Città: {user.city}</p>
                        
                        <div className="user-actions">
                            <button onClick={() => {
                                setEditingUser({
                                    id: user.id,
                                    nome: user.name,
                                    citta: user.city,
                                    modifica: true,
                                    elimina: false
                                })
                            }}>
                                Modifica
                            </button>
                            
                            <button onClick={() => {
                                setEditingUser({
                                    id: user.id,
                                    nome: user.name,
                                    citta: user.city,
                                    modifica: false,
                                    elimina: true
                                })
                            }}>
                                Elimina
                            </button>
                        </div>
                    </div>

                    {editingUser.modifica && editingUser.id === user.id && (
                        <PutQuery
                            id={user.id}
                            vecchiaCitta={user.city}
                            vecchioNome={user.name}
                            closeEdit={resetEditing}
                        />
                    )}

                    {editingUser.elimina && editingUser.id === user.id && (
                        <DeleteQuery
                            id={user.id}
                            userName={user.name}
                            onCancel={resetEditing}
                        />
                    )}
                </div>
            ))}
        </div>
    )
}