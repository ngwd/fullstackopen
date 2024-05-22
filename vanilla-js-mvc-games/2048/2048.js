import { shiftArray, crossProduct, genNullMatrix, range} from './shifter.js';
// model
const CANVAS_SIZE = 600;
const CANVAS_BGCOLOR = "#EEEEEE";
const GAME_SIZE = 4;

const BLOCK_SIZE = 130;
const BLOCK_MARGIN = (CANVAS_SIZE - GAME_SIZE*BLOCK_SIZE) / (GAME_SIZE+1);
const BLOCK_FGCOLOR = "#7AADCC";
const BLOCK_BGCOLOR = "#CCCCCC";

const DIR = Object.freeze({
  LEFT: 0,
  RIGHT:1,
  UP:   2,
  DOWN: 3
})

// random int in [a, b)
const randomInt = (a, b) => a + Math.floor(Math.random()*(b -a));
const randomChoice = (arr) => arr[randomInt(0, arr.length)];

const R = range(GAME_SIZE);
const C = range(GAME_SIZE);
const allCoordinates = crossProduct(R, C);

class Game {
  constructor() {
    this.data = [];
    this.initializeData();
  }

  initializeData() {
    this.data = genNullMatrix(GAME_SIZE, GAME_SIZE)
    this.generateNewBlock(); 
    this.generateNewBlock(); 
  }

  generateNewBlock () {
    let tmp = allCoordinates.filter(([x, y]) => this.data[x][y] === null)
    if (tmp.length===0) return;

    let [x, y] = randomChoice(tmp);
    this.data[x][y] = 2;
  }

  shiftBlock(arr, d) {
    if (d === undefined || d === DIR.LEFT) {
      shiftArray(arr);
    }
    else if (d === DIR.RIGHT) {
      arr.reverse();
      this.shiftBlock(arr, DIR.LEFT);
      arr.reverse();
    }
  }
  shiftMatrix(d) {
    switch (d) {
      case DIR.LEFT:
      case DIR.RIGHT:
        this.data.map(row => this.shiftBlock(row, d));
        break;
      case DIR.UP:
      case DIR.DOWN:
        break;
      default:
    }
  }
} // end of Game


// view
class View {
  constructor(game, container) {
    this.container = container;
    this.game = game;
    this.initializeContainer();
    document.addEventListener('keydown', (e)=> {
      // console.log(`key pressed ${e.key})`);
      switch (e.key) {
        case 'ArrowLeft':
          this.game.shiftMatrix(DIR.LEFT);
          break;
        case 'ArrowRight':
          this.game.shiftMatrix(DIR.RIGHT);
          break;
        case 'ArrowUp':
          this.game.shiftMatrix(DIR.UP);
          break;
        case 'ArrowDown':
          this.game.shiftMatrix(DIR.DOWN);
          break;
      }
      this.game.generateNewBlock();
      this.drawGame();

    });
  }

  initializeContainer() {
    this.container.style.height = CANVAS_SIZE;
    this.container.style.width =  CANVAS_SIZE;
    this.container.style.backgroundColor = CANVAS_BGCOLOR;
    this.container.style.position = "relative";
    this.container.style.display = "inline-block";
  }
  drawGame() {
    for(let i = 0; i<GAME_SIZE; i++) {
      for(let j = 0; j<GAME_SIZE; j++) {
        let num = this.game.data[i][j] 
        if (num === null) {
          this.drawBlock(i, j, BLOCK_BGCOLOR)
        }
        else {
          this.drawNumBlock(i, j, num)
        }
      }
    }
  }
  drawBlock (i, j, color) {
    let block = document.createElement("div")
    block.style.width = BLOCK_SIZE;
    block.style.height = BLOCK_SIZE;
    block.style.backgroundColor = color;
    block.style.position = "absolute";
    block.style.top = i * BLOCK_SIZE + (i+1)*BLOCK_MARGIN;
    block.style.left = j * BLOCK_SIZE + (j+1)*BLOCK_MARGIN;
    this.container.append(block);
    return block;
  }
  drawNumBlock(i, j, num) {
    let span = document.createElement("span")
    span.style.fontSize = 40
    span.style.fontFamily = "Lucida Console"
    span.style.color = "#FFFFFF"

    // span.style.position = "relative";
    // span.style.top = 0.5; span.style.left = 0.5;
    // span.style.transform = translate(-0.5, -0.5);

    let text = document.createTextNode(num)
    span.appendChild(text)
    span.style.position = "absolute";
    span.style.top = (BLOCK_SIZE - span.offsetHeight )/2 - BLOCK_MARGIN;
    span.style.left = (BLOCK_SIZE - span.offsetWidth)/2 - BLOCK_MARGIN;

    let block = this.drawBlock(i, j, BLOCK_FGCOLOR)
    block.appendChild(span)
  }
}

// controller
var container = document.getElementById("game-container");
var game = new Game();
var view = new View(game, container);
view.drawGame();