import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from "./components/Navbar"
import Home from "./components/Home"
import About from "./components/About"
import Services from "./components/Services"
import Contact from "./components/Contact"


function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home style={{ border: '1px solid gray', padding: '10px', margin: '10px' }} />} />
          <Route path="/about" element={<About style={{ border: '1px solid gray', padding: '10px', margin: '10px' }} />} />
          <Route path="/contact" element={<Contact style={{ border: '1px solid gray', padding: '10px', margin: '10px' }} />} />
          <Route path="/services" element={<Services style={{ border: '1px solid gray', padding: '10px', margin: '10px' }} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
