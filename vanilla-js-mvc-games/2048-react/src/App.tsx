import React, { useEffect, useState, useRef } from 'react'
import { range, randomChoice, genNullMatrix, crossProduct, squeeze, DIRECTIONS } from '../../model_ts/shifter'
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
  const hasGeneratedBlocks = useRef(false);

  const generateNewBlock = () => {
    console.log("generateNewBlock called");
    setData(prevData => {
      console.log("setData running");
      console.table(prevData);
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
    if (!hasGeneratedBlocks.current) {
      generateNewBlock();
      generateNewBlock();
      hasGeneratedBlocks.current = true;
    }
  }, []);
  const handleKeyDown = (event: KeyboardEvent) => {
    let changed = false;
    setData( prevData => {
      console.log("old data");
      console.table(prevData);
      const copiedData = prevData.map(row => [...row]);
      switch (event.key) {
        case 'ArrowUp':
          console.log("handle key down up");
          squeeze(copiedData, DIRECTIONS.up);
          break;
        case 'ArrowDown':
          console.log("handle key down down");
          squeeze(copiedData, DIRECTIONS.down);
          break;
        case 'ArrowLeft':
          console.log("handle key down left");
          squeeze(copiedData, DIRECTIONS.left);
          break;
        case 'ArrowRight':
          console.log("handle key down right");
          squeeze(copiedData, DIRECTIONS.right);
          break;
        default:
          break;
      }
      console.log("new data");
      console.table(copiedData);
      return copiedData;
    });
  }

  /*
  const shiftMatrix = (event: KeyboardEvent) {
    let changed = false;
    let new_matrix;
    switch (event.key) {
      case 'ArrowRight':
        new_matrix = squeeze_row_wise(data, DIRECTIONS.right)
        changed = !areMatricesEqual(data, new_matrix);
        this.data = new_matrix; 
      case 'ArrowLeft':
        new_matrix = squeeze_row_wise(this.data, d)
        changed = !areMatricesEqual(this.data, new_matrix);
        this.data = new_matrix; 
        break;
      case DIRECTIONS.up:
        new_matrix = squeeze_col_wise(this.data, DIRECTIONS.left);
        changed = !areMatricesEqual(this.data, new_matrix);
        this.data = new_matrix; 
        break;
      case DIRECTIONS.down:
        new_matrix = squeeze_col_wise(this.data, DIRECTIONS.right);
        changed = !areMatricesEqual(this.data, new_matrix);
        this.data = new_matrix; 
        break;
      default: break;
    }
    return changed;
  }
  */
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
