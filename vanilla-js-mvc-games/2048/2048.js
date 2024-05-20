// model
CANVAS_SIZE = 600;
CANVAS_BGCOLOR = "#EEEEEE";
GAME_SIZE = 4;

BLOCK_SIZE = 130;
BLOCK_MARGIN = (CANVAS_SIZE - GAME_SIZE*BLOCK_SIZE) / (GAME_SIZE+1);
BLOCK_FGCOLOR = "#7AADCC";
BLOCK_BGCOLOR = "#CCCCCC";
GAME_SIZE = 4;

// random int in [a, b)
randomInt = (a, b) => a + Math.floor(Math.random()*(b -a));
randomChoice = (arr) => arr[randomInt(0, arr.length)];

// get [[0,0], [0,1]...,[0, n]
//      [1,0], [1,1]...
//      ...
//      [m, 0], [m,2]...
//     ]

// range(5)   => [0, 1, 2, 3, 4];   range(2,5) => [2, 3, 4]; 
range = (lo, hi) => {
  if (hi === undefined) {
    hi = lo;
    lo = 0; 
  }
  if (lo >= hi) return []; 
  return [...Array(hi-lo).keys()].map(i=>i+lo);
};
R = range(GAME_SIZE);
C = range(GAME_SIZE);
crossProduct = (rows, cols) => rows.flatMap(i => cols.map(j => [i,j]));
allCoordinates = crossProduct(R, C);

// nullMatrix = (rows, cols) => rows.Map(i => cols.map(j => null));
// getNullMatrix = (rows, cols) => nullMatrix(arr, arr);
/*
allCoordinates = ((rows, cols) => {
  return Array(rows).fill().map((_, x) => 
    Array(cols).fill().map((_, y) => [x, y])
  ).flat();
})(GAME_SIZE, GAME_SIZE);
*/

getNullMatrix = ((rows, cols) => {
  // return Array(GAME_SIZE).fill(Array(GAME_SIZE).fill(null)) // it is buggy with this line, 
  return Array.from({length:rows}, ()=>Array(cols).fill(null));
});

class Game {
  constructor() {
    this.data = [];
    this.initializeData();
  }

  initializeData() {
    this.data = getNullMatrix(GAME_SIZE, GAME_SIZE)
    this.generateNewBlock(); 
    this.generateNewBlock(); 
  }

  generateNewBlock () {
    let tmp = allCoordinates.filter(([x, y]) => this.data[x][y] === null)
    if (tmp.length===0) return;

    let [x, y] = randomChoice(tmp);
    console.log(x, y)
    this.data[x][y] = 2;
  }

  // {2, n, 2, n} => {4, n, n, n}
  // {2, 2, 2, n} => {4, 2, n, n}
  // {2, 2, 2, 2} => {4, n, 4, n}
  shiftBlock(arr) {

  }
}

// view
class View {
  constructor(game, container) {
    this.container = container;
    this.game = game;
    this.initializeContainer();
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
        //  else 
        //  this.drawBlock(i, j, this.game.data[i][j]);
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
    let block = this.drawBlock(i, j, BLOCK_FGCOLOR)
    block.appendChild(span)
  }
}

// controller
var container = document.getElementById("game-container");
var game = new Game();
var view = new View(game, container);
view.drawGame();