// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Home } from './Routes/Home.tsx'
import { MakePicks } from "./Routes/MakePicks.tsx";


function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/makepicks" element={<MakePicks />} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
