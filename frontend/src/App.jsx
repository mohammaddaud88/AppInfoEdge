import React,{ useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import JDManagement from './components/JDManagement'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <JDManagement/>
    </>
  )
}

export default App
