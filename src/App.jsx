import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RotatingCube from './RotatingCube';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RotatingCube />
    </>
  )
}

export default App
