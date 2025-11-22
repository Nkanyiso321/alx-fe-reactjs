import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";

import './App.css'

function App() {

  return (
    <>
     {/* Navigation */}
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/about">About</Link>
      </nav>

       {/* Routes */}
      <Routes>
        <Route path="/" element={<>Home</>} />
      </Routes>
      
    </>
  )
}

export default App
