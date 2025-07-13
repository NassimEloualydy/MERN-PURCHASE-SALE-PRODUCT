import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import RouteSystem from './Routes/RouteSystem'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <RouteSystem/>
    </>
  )
}

export default App
