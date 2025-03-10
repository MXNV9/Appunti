import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'

export const DeleteQuery = ({ id, closeDelete }) => {

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async () => {
            const response = await axios.delete(`https://67cf4036823da0212a81f120.mockapi.io/api/v1/Users/${id}`)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["users"])
            alert("Utente eliminato con successo!")
            closeDelete()
        },
        onError: (error) => {
            console.error("Errore durante l'eliminazione:", error)
        }
    })

    return (
        <div>

            <p>Sei sicuro di voler eliminare?</p>
            <button
            onClick={()=>mutation.mutate()}
            > Elimina </button>
        </div>
    )
}
