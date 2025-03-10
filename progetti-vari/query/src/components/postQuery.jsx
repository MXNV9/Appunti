import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function PostQuery() {

    // stati per prendere i dati
    const [fullName, setFullName] = useState("")
    const [city, setCity] = useState("")

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (newUser) => {
           return axios.post("https://67cf4036823da0212a81f120.mockapi.io/api/v1/Users", newUser)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] })
        }
    })

    return (
        <>
            <h1> Nuovo Utente </h1>

            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <input type="text"
                    placeholder="Nome e Cognome"
                    value={fullName}
                    onChange={(e) => setFullName(e.currentTarget.value)}
                />

                <input type="text"
                    placeholder="Citta"
                    value={city}
                    onChange={(e) => setCity(e.currentTarget.value)}
                />

                <button
                    onClick={() => {
                        try {
                            mutation.mutate({ name: fullName, city: city })
                        } catch (error) {
                            console.error(error)
                        }
                    }}

                > Inserisci nuovo utente </button>
            </div>
        </>
    )
}



































/**
 *     // Funzione che invia i dati dell'articolo al backend
    const createArticle = async ({ titolo, tag, testo, descrizione, categoria }) => {
        const response = await axios.post("http://localhost:8080/Articoli/new", {
            titolo,
            tag,
            testo,
            descrizione,
            categoria,
        });

        return response.data;
    };

    // Stati per ogni campo dell'articolo
    const [titolo, setTitolo] = useState("");
    const [tag, setTag] = useState("");
    const [testo, setTesto] = useState("");
    const [descrizione, setDescrizione] = useState("");
    const [categoria, setCategoria] = useState("");

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createArticle,
        onSuccess: () => {
            queryClient.invalidateQueries(["articles"]); // Aggiorna la lista degli articoli
            alert("Articolo creato con successo!");
            setTitolo("");
            setTag("");
            setTesto("");
            setDescrizione("");
            setCategoria("");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({ titolo, tag, testo, descrizione, categoria });
    };

    return (
        <div>
            <h2>Crea un nuovo articolo</h2>
            <input type="text" placeholder="Titolo" value={titolo} onChange={(e) => setTitolo(e.target.value)} />
            <input type="text" placeholder="Tag" value={tag} onChange={(e) => setTag(e.target.value)} />
            <textarea placeholder="Testo" value={testo} onChange={(e) => setTesto(e.target.value)} />
            <input type="text" placeholder="Descrizione" value={descrizione} onChange={(e) => setDescrizione(e.target.value)} />
            <input type="text" placeholder="Categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} />

            <button onClick={handleSubmit} disabled={mutation.isLoading}>
                {mutation.isLoading ? "Creazione in corso..." : "Crea Articolo"}
            </button>

            {mutation.isError && <p>Errore: {mutation.error.message}</p>}
        </div>
    );
 */