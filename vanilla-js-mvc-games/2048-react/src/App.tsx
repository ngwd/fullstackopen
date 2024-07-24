import React, { useState } from 'react'
import { genZeroMatrix } from '../../model_ts/shifter'
import './App.css'

interface BlockProps {
  data:number[][];
}
const style = {
  blockStyle: {
    height: 80, 
    width: 80, 
    background: '#AD9D8F',
    margin: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 45,
    fontWeight: "80",
    color: "white"
  }
};

const Block: React.FC<BlockProps> = ({data}) => {
  const { blockStyle } = style; 
  return (
    <div>
      {data.map((row, rowIndex) => (
        <div key={rowIndex} style={{display: 'flex' }}>
          {row.map((number, colIndex) =>(
            <div key={`${rowIndex}-${colIndex}`} 
              style={{...blockStyle}}> 
              {number}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}; 

const App: React.FC = ()=> {
  const GAME_SIZE = 4;
  const [data, setData] = useState<number[][]>(genZeroMatrix(GAME_SIZE, GAME_SIZE));
  return (
    <div> 
      <Block data={data} />
    </div>
  ) 
}

export default App
