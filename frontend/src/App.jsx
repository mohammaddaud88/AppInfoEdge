import React,{ useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import JDManagement from './components/JDManagement'
import {BrowserRouter as Router ,Routes, Route}  from 'react-router-dom'
import Dashboard from './components/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
