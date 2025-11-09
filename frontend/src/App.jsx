import Home from "./components/Home/Home"
import Navbar from "./components/Navbar"
import Singin from "./components/Singin/Singin"
import { Routes, Route } from "react-router-dom"
import './App.css'

function App() {

  return (
    <>

      <div className="h-screen w-full bg-[linear-gradient(90.5deg,rgba(112,181,176,1)_1.9%,rgba(220,244,241,1)_87.7%)]">
        <Navbar />

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Singin />} />
          <Route path="/singin" element={<Singin />} />

        </Routes>

      </div>

    </>
  )
}

export default App
