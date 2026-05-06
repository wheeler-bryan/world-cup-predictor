// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Home } from './Routes/Home.tsx'
import { Login } from './Routes/Login.tsx'
import {CreateAccount} from "./Routes/CreateAccount.tsx";
import {MakePicks} from "./Routes/MakePicks.tsx";


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create-account" element={<CreateAccount />} />
              <Route path="/makepicks" element={<MakePicks />} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
