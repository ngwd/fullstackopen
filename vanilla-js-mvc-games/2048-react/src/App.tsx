import { useState } from 'react'
import { genNullMatrix } from '../../model_ts/shifter'
import './App.css'

function App() {
  const GAME_SIZE = 4;
  const [count, setCount] = useState(0);
  const [data, setData] = useState(genNullMatrix(GAME_SIZE, GAME_SIZE));

  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          counts are {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App
