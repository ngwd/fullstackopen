import React, { useEffect, useState, useRef } from 'react'
import { range, randomChoice, genNullMatrix, crossProduct, squeeze, DIRECTIONS, areMatricesEqual } from '../../model_ts/shifter'
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
const colorMapObject:{ [key: number]: string } = {
  2:    "#EBDCD0",
  // null: "#EBDCD0",
  4:    "#E9DBBA",
  8:    "#E9A067",
  16:   "#F08151",
  32:   "#F2654F",
  64:   "#F1462C",
  128:  "#E7C65E",
  256:  "#E8C350",
  512:  "#E8BE40",
  1024: "#E8BB31",
  2048: "#E7B723",
};
const Block: React.FC<BlockProps> = ({ data }) => {
  return (
    <div style={ style.containerStyle }>
      {data.map((row, rowIndex) => (
        <div key={rowIndex} style={ style.rowStyle }>
          { row.map((number, colIndex) => (
            <div key={`${ rowIndex }-${ colIndex }`} 
              style={{... style.blockStyle,
                background:number!==null ? colorMapObject[number]: 'lightgray'
               }}>
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
  const hasGeneratedBlocks = useRef(false);

  const generateNewBlock = <T extends number|null>(data: T[][]): boolean => {
    console.log("generateNewBlock called");
    const copiedData = data.map(row => [...row]);
    const availablePositions = allPos.filter(([x, y]) => copiedData[x][y] === null);
    if (availablePositions.length === 0) return false;
    const [x, y] = randomChoice(availablePositions); 
    data[x][y] = 2 as T;
    return true;
  };

  useEffect(() => {
    if (!hasGeneratedBlocks.current) {
      setData(prevData => {
        const copiedData = prevData.map(row => [...row]);
        generateNewBlock(copiedData);
        generateNewBlock(copiedData);
        return copiedData;
      })
      hasGeneratedBlocks.current = true;
    }
  }, []);
  const handleKeyDown = (event: KeyboardEvent) => {
    setData( prevData => {
      const copiedData = prevData.map(row => [...row]);
      switch (event.key) {
        case 'ArrowUp':
          squeeze(copiedData, DIRECTIONS.up);
          break;
        case 'ArrowDown':
          squeeze(copiedData, DIRECTIONS.down);
          break;
        case 'ArrowLeft':
          squeeze(copiedData, DIRECTIONS.left);
          break;
        case 'ArrowRight':
          squeeze(copiedData, DIRECTIONS.right);
          break;
        default:
          break;
      }
      let changed:boolean = areMatricesEqual(copiedData, prevData);

      let result = generateNewBlock(copiedData);
      if (false === changed) {
        if (result===false) {
          console.log("end of the game");
        }
      }
      return changed ? prevData : copiedData;
    });
  }

  useEffect(()=> {
    window.addEventListener('keydown', handleKeyDown);
    return ()=> {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div> 
      <Block data={data} />
    </div>
  );
}
export default App
