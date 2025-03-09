# Guida a React Query

## Configurazione iniziale

Per utilizzare React Query, è necessario configurare il `QueryClient` e il `QueryClientProvider` all'inizio dell'applicazione:

```js
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Crea un'istanza di QueryClient
const queryClient = new QueryClient();

// Avvolgi la tua app con QueryClientProvider
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
```

## useQuery - Richieste di sola lettura

`useQuery` è l'hook principale per effettuare richieste di sola lettura (GET).

### Struttura base di useQuery

```js
const {
  data, // I dati restituiti dalla query
  error, // L'errore (se presente)
  isLoading, // true durante il primo caricamento
  isPending, // true quando la query è in attesa
  isError, // true quando la query ha generato un errore
  status, // 'loading', 'error', 'success'
  fetchStatus, // 'fetching', 'paused', 'idle'
  refetch, // funzione per forzare un nuovo fetch
} = useQuery({
  queryKey: ["uniqueKey"], // Chiave univoca per identificare la query
  queryFn: fetchFunction, // Funzione che effettua la richiesta
  // ... altre opzioni
});
```

### Passaggio parametri alla query

```js
// Passare un parametro statico
const { data } = useQuery({
  queryKey: ["pokemon", "charizard"],
  queryFn: () => fetchPokemon("charizard"),
});

// Passare un parametro variabile
const pokemon = "charizard";
const { data } = useQuery({
  queryKey: ["pokemon", pokemon],
  queryFn: () => fetchPokemon(pokemon),
});

// Passare più parametri
const { data } = useQuery({
  queryKey: ["pokemonList", 10],
  queryFn: () => fetchPokemonList(10),
});
```

### Gestione degli errori

Per gestire correttamente gli errori, la funzione `queryFn` deve:

- Lanciare un'eccezione (`throw`) oppure
- Restituire una Promise rejected

Esempio di gestione degli errori con axios:

```js
const fetchGroups = async (id) => {
  try {
    const response = await axios.get(`https://api.zippopotam.us/IT/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(`Il CAP ${id} non esiste!`);
  }
};
```

### Query dipendenti

Per eseguire una query solo dopo che un'altra ha restituito un risultato, usa l'opzione `enabled`:

```js
// Prima query per ottenere l'utente
const { data: user } = useQuery({
  queryKey: ["user", email],
  queryFn: () => getUserByEmail(email),
});

const userId = user?.id;

// Seconda query che dipende dalla prima
const { data: projects } = useQuery({
  queryKey: ["projects", userId],
  queryFn: () => getProjectsByUser(userId),
  enabled: !!userId, // Eseguita solo quando userId è disponibile
});
```

## useQueries - Query multiple

`useQueries` permette di eseguire più query contemporaneamente in modo dinamico.

### Esempio base

```js
// Esempio con array statico
const results = useQueries({
  queries: [
    { queryKey: ["post", 1], queryFn: () => fetchPost(1) },
    { queryKey: ["post", 2], queryFn: () => fetchPost(2) },
  ],
});

// Esempio con array dinamico
function UsersComponent({ userIds }) {
  const userQueries = useQueries({
    queries: userIds.map((id) => {
      return {
        queryKey: ["user", id],
        queryFn: () => fetchUserById(id),
      };
    }),
  });

  // userQueries è un array di risultati, uno per ogni query
  return (
    <div>
      {userQueries.map((query, index) => (
        <div key={userIds[index]}>
          {query.isLoading ? (
            <p>Caricamento...</p>
          ) : query.isError ? (
            <p>Errore: {query.error.message}</p>
          ) : (
            <div>
              <h3>{query.data.name}</h3>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
```

## useMutation - Modificare i dati

`useMutation` si usa per operazioni che modificano i dati sul server (POST, PUT, DELETE, ecc.).

### Struttura base

```js
const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: (newTodo) => {
    return axios.post("/api/todos", newTodo);
  },
  onSuccess: () => {
    // Invalida e ricarica le query con questa chiave
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
});

// Uso:
mutation.mutate({ title: "Nuovo todo" });

// Oppure con async/await:
try {
  const result = await mutation.mutateAsync({ title: "Nuovo todo" });
  console.log(result);
} catch (error) {
  console.error(error);
}
```

### Differenza tra mutate e mutateAsync

- `mutate`: Non restituisce una promise, usa i callback per gestire il risultato
- `mutateAsync`: Restituisce una promise, quindi può essere usato con async/await

## invalidateQueries - Aggiornare i dati

`invalidateQueries` marca le query come obsolete, forzando React Query a ricaricare i dati.

```js
// Invalida una query specifica
queryClient.invalidateQueries({ queryKey: ["todos", 1] });

// Invalida tutte le query che iniziano con 'todos'
queryClient.invalidateQueries({ queryKey: ["todos"] });
```

## Vantaggi di React Query

1. **Caching automatico**: I dati vengono memorizzati in cache e riutilizzati quando necessario
2. **Ricaricamento intelligente**: Ricarica i dati solo quando necessario (quando le query key cambiano)
3. **Gestione dello stato**: Fornisce informazioni dettagliate sullo stato delle richieste
4. **Ottimizzazione delle prestazioni**: Riduce le richieste di rete e migliora l'esperienza utente
5. **Sincronizzazione server-client**: Mantiene i dati dell'interfaccia sincronizzati con il server
