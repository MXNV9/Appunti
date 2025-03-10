import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'

export const PutQuery = ({ id, vecchioNome, vecchiaCitta, closeEdit }) => {
    const queryClient = useQueryClient()
    
    const [name, setName] = useState(vecchioNome)
    const [city, setCity] = useState(vecchiaCitta)
    
    const mutation = useMutation({
        mutationFn: async () => {
            const response = await axios.put(
                `https://67cf4036823da0212a81f120.mockapi.io/api/v1/Users/${id}`, 
                { name, city }
            )
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["users"])
            alert("Utente Aggiornato con successo!")
            closeEdit()
        },
        onError: (error) => {
            console.error("Errore durante l'aggiornamento:", error)
        }
    })
    
    const handleSubmit = (e) => {
        e.preventDefault()
        mutation.mutate()
    }
    
    return (
        <div>
            <h1>Modifica Utente</h1>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="Nome">Inserisci nuovo nome</label>
                    <input 
                        type="text"
                        id="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="Citta">Inserisci nuova città</label>
                    <input 
                        type="text"
                        id="Citta"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </div>
                
                <button type="submit" disabled={mutation.isLoading}>
                    {mutation.isLoading ? "Aggiornamento in corso..." : "Aggiorna Utente"}
                </button>
                <button type="button" onClick={closeEdit}>Annulla</button>
            </form>
            
            {mutation.isError && <p className="error">Errore: {mutation.error.message}</p>}
        </div>
    )
}