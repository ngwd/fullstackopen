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
    background: 'lightgray',
    margin: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 45,
    fontWeight: "80",
    color: "white"
  },
  containerStyle: {
    // display: 'flex',
    flexDirection: 'column' as const,
    background: '#AD9D8F',
    width: 'max-content',
    margin: 'auto',
    padding: 5,
    borderRadius: 5,
  },
  rowStyle: {
    display: 'flex',
    // marginTop: 1,
    // marginBottom: 1,
  }
};

const Block: React.FC<BlockProps> = ({data}) => {
  return (
    <div style={style.containerStyle}>
      {data.map((row, rowIndex) => (
        <div key={rowIndex} style={ style.rowStyle }>
          {row.map((number, colIndex) =>(
            <div key={`${rowIndex}-${colIndex}`} 
              style={style.blockStyle}> 
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
