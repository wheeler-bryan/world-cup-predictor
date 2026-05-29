import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Home } from './Routes/Home.tsx'
import { MakePicks } from "./Routes/MakePicks.tsx";
import { BracketSubmitted } from "./Routes/BracketSubmitted";
import { Leaderboard } from "./Routes/Leaderboard.tsx";
import { ProductionLeaderboard } from "./Routes/ProductionLeaderboard.tsx";

function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/makepicks" element={<MakePicks />} />
              <Route path="/bracket_submitted" element={<BracketSubmitted />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/leaderboard_testing" element={<ProductionLeaderboard />} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
