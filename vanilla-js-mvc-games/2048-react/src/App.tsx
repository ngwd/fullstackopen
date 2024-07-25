import React, { useEffect, useState } from 'react'
import { range, randomChoice, genNullMatrix, crossProduct } from '../../model_ts/shifter'
import './App.css'

interface BlockProps {
  data:number[][];
}
const style = {
  blockStyle: {
    display: 'flex',
    height: 80, 
    width: 80, 
    background: 'lightgray',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 45,
    fontWeight: "400",
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
const Block: React.FC<BlockProps> = ({ data }) => {
  return (
    <div style={ style.containerStyle }>
      {data.map((row, rowIndex) => (
        <div key={rowIndex} style={ style.rowStyle }>
          { row.map((number, colIndex) => (
            <div key={`${ rowIndex }-${ colIndex }`} 
              style={ style.blockStyle }>
              { number }
            </div>
          )) }
        </div>
      ))}
    </div>
  )
}; 

const App: React.FC = ()=> {
  const GAME_SIZE = 4;
  const allPos = crossProduct(range(GAME_SIZE), range(GAME_SIZE));
  const [data, setData] = useState<number[][]>(genNullMatrix(GAME_SIZE, GAME_SIZE));

  const generateNewBlock = () => {
    console.log("generateNewBlock called");
    setData(prevData => {
      console.log("setData running");
      const copiedData = prevData.map(row => [...row]);
      const availablePositions = allPos.filter(([x, y]) => copiedData[x][y] === null);

      if (availablePositions.length === 0) return prevData;

      const [x, y] = randomChoice(availablePositions);
      copiedData[x][y] = 2;
      console.log(`New block at (${x}, ${y})`);
      console.table(copiedData);
      return copiedData;
    });
  };

  useEffect(() => {
    generateNewBlock();
    generateNewBlock();
  }, []);

  return (
    <div> 
      <Block data={data} />
    </div>
  ) 
}
export default App
