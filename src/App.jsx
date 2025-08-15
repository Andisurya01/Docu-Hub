import Background from "./components/background"
import Home from "./pages/home"
import React from 'react'

function App() {

  return (
    <div className="relative h-screen overflow-hidden">
      <Home />
      <Background />
    </div>
  )
}

export default App
