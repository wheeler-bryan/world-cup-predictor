import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { ProductionLeaderboard } from "./Routes/ProductionLeaderboard.tsx";

function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<ProductionLeaderboard />} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
