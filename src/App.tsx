import { useState } from 'react'
import './App.css'
import ListGroup from './ListGroup.tsx';

function App() {
  const [] = useState(0)

  return (
    <>
    <h1>City Explorer</h1>
    <div>
      <ListGroup/>
      <ListGroup/>
    </div>  
    </>
  )
}

export default App
