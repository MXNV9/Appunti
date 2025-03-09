import { queryOptions, useQueries, useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const MultiQuery = () => {

    const fetchGroups = async (id) => {
        try {
            const response = await axios.get("https://api.zippopotam.us/IT/" + id)
            return response.data
        } catch (error) {
            console.log(error)
            throw new Error(`Il CAP ${id} non esiste!`)
        }
    }

    function groupOptions(id) {
        return queryOptions({
            queryKey: ['groups', id],
            queryFn: () => fetchGroups(id),
        })
    }

    const query = useQuery({
        ...groupOptions("00010"),
        select: (data) => data["post code"],
    })

    console.log(query)

    console.log("--------------")

    const multiple = useQueries({
        queries: [groupOptions("37040"), groupOptions("37053")],
    })
    console.log(multiple)

    return (
        <div>
            MultiQuery
            {multiple.map((i, k) => (
                <div key={k} style={{ border: "1px solid white" }}>
                    {i.isPaused && <p> Perdita di connessione </p>}
                    {i.isLoading && <p>Caricamento...</p>}
                    {i.error && (
                        <p style={{ color: "red" }}>Errore: {i.error.message}</p>
                    )}
                    {i.data?.country}
                    {i.data?.places?.map((l, p) => (
                        <p key={p}> {l["place name"]}</p>
                    ))}
                </div>
            ))}
        </div>
    )
}
