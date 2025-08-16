import Background from "./components/background"
// import Home from "./pages/home"
import React from 'react'
import Home from "./pages/home_dev"

function App() {

  return (
    <div className="relative h-screen overflow-hidden">
      <Home />
      <Background />
    </div>
  )
}

export default App
