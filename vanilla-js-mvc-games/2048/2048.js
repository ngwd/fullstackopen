import { DIRECTIONS, range, genNullMatrix, crossProduct, squeeze_row_wise, squeeze_col_wise, areMatricesEqual} from './shifter.js'

// model
const CANVAS_SIZE = 600;
const CANVAS_BGCOLOR = "#EEEEEE";
const GAME_SIZE = 4;

const BLOCK_SIZE = 130;
const BLOCK_MARGIN = (CANVAS_SIZE - GAME_SIZE*BLOCK_SIZE) / (GAME_SIZE+1);
const BLOCK_FGCOLOR = "#7AADCC";
const BLOCK_BGCOLOR = "#CCCCCC";

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

    let tmp1 = this.data;
    console.log(tmp1)
  }

  shiftMatrix(d) {
    let changed = false;
    let new_matrix;
    switch (d) {
      case DIRECTIONS.left:
      case DIRECTIONS.right:
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
        new_matrix = squeeze_col_wise(this.data, DIRECTIONS.left);
        changed = !areMatricesEqual(this.data, new_matrix);
        this.data = new_matrix; 
        break;
      default: break;
    }
    return changed;
  }
} // end of Game

// view
class View {
  constructor(game, container) {
    this.container = container;
    this.game = game;
    this.initializeContainer();
    let changed;
    document.addEventListener('keydown', (e)=> {
      // console.log(`key pressed ${e.key})`);
      switch (e.key) {
        case 'ArrowLeft':
          changed = this.game.shiftMatrix(DIRECTIONS.left);
          if (changed) {
            this.game.generateNewBlock();
            this.drawGame();
          }
          break;
        case 'ArrowRight':
          changed = this.game.shiftMatrix(DIRECTIONS.right);
          if (changed) {
            this.game.generateNewBlock();
            this.drawGame();
          }
          break;
        case 'ArrowUp':
          changed = this.game.shiftMatrix(DIRECTIONS.up);
          if (changed) {
            this.game.generateNewBlock();
            this.drawGame();
          }
          break;
        case 'ArrowDown':
          changed = this.game.shiftMatrix(DIRECTIONS.down);
          if (changed) {
            this.game.generateNewBlock();
            this.drawGame();
          }
          break;
        default: break;
      }
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