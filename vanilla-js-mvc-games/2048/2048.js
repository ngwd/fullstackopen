// model
CANVAS_SIZE = 600
CANVAS_BGCOLOR = "#333333"
GAME_SIZE = 4

BLOCK_SIZE = 130
BLOCK_MARGIN = (CANVAS_SIZE - GAME_SIZE*BLOCK_SIZE) / (GAME_SIZE+1)
// BLOCK_BGCOLOR = "#111111"
BLOCK_BGCOLOR = "#555555"
GAME_SIZE = 4

// random int in [a, b)
randomInt = (a, b) => a + Math.floor(Math.random()*(b -a));
randomChoice = (arr) => arr[randomInt(0, arr.length)];

allPositions = ((rows, cols) => {
  return Array(rows).fill().map((_, x) => 
    Array(cols).fill().map((_, y) => [x, y])
  ).flat();
})(GAME_SIZE, GAME_SIZE);

class Game {
  constructor() {
    this.data = [];
    this.initializeData();
    
  }
  initializeData() {
    // this.data = Array(GAME_SIZE).fill(Array(GAME_SIZE).fill(null)) // it is buggy with this line, 
    this.data = Array.from({length:GAME_SIZE}, ()=>Array(4).fill(null)); // should use this line instead
    this.generateNewBlock(); 
    this.generateNewBlock(); 
  }

  generateNewBlock () {
    let tmp = allPositions.filter(([X, Y]) => this.data[X][Y] === null)
    if (tmp.length===0) return;

    let [x, y] = randomChoice(tmp);
    console.log(x, y)
    this.data[x][y] = 2;
  }
}

// view
class View {
  constructor(container) {
    this.container = container;
    this.initializeContainer();
  }

  initializeContainer() {
    this.container.style.width = this.container.style.height = CANVAS_SIZE;
    this.container.style.backgroundColor = CANVAS_BGCOLOR;
    this.container.style.position = "relative";
    this.container.style.display = "inline-block";
  }
  drawGame() {
    for(let i = 0; i<GAME_SIZE; i++) {
      for(let j = 0; j<GAME_SIZE; j++) {
        this.drawBlockBG(i, j);
      }
    }
  }
  drawBlockBG (i, j) {
    let block = document.createElement("div")
    block.style.width = BLOCK_SIZE;
    block.style.height = BLOCK_SIZE;
    block.style.backgroundColor = BLOCK_BGCOLOR;
    block.style.position = "absolute";
    block.style.top = i * BLOCK_SIZE + (i+1)*BLOCK_MARGIN;
    block.style.left = j * BLOCK_SIZE + (j+1)*BLOCK_MARGIN;
    this.container.append(block);
  }
}

// controller
var container = document.getElementById("game-container");
var view = new View(container);
var game = new Game();
view.drawGame();