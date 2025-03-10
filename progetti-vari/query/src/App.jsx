import { POkemon } from './components/POkemon'

import './App.css'
import { MultiQuery } from './components/MultiQuery'
import { GetQuery } from './components/getQuery'
import { PostQuery } from './components/postQuery'
import { PutQuery } from './components/putQuery'

function App() {

  return (
    <>
      <h1>Esempio d'uso di react-query per i pokemon / cap italiani </h1>
      {/* <br />
      <POkemon />
      <MultiQuery /> */}
      <GetQuery />
      <PostQuery />
      {/* <PutQuery /> */}
    </>
  )
}

export default App
