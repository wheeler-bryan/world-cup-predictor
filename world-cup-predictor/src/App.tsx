import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Leaderboard } from "./Routes/Leaderboard.tsx";
import { ProductionLeaderboard } from "./Routes/ProductionLeaderboard.tsx";

function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Leaderboard />} />
              <Route path="/leaderboard_testing" element={<ProductionLeaderboard />} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
