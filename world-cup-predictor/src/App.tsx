import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { ProductionLeaderboard } from "./Routes/ProductionLeaderboard.tsx";
import {MakePicks} from "./Routes/MakePicks.tsx";

function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<ProductionLeaderboard />} />
              <Route path="/shevlinbot" element={<MakePicks />} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
