// model
CANVAS_SIZE = 600;
CANVAS_BGCOLOR = "#EEEEEE";
GAME_SIZE = 4;

BLOCK_SIZE = 130;
BLOCK_MARGIN = (CANVAS_SIZE - GAME_SIZE*BLOCK_SIZE) / (GAME_SIZE+1);
BLOCK_FGCOLOR = "#7AADCC";
BLOCK_BGCOLOR = "#CCCCCC";

const DIR = Object.freeze({
  LEFT: 0,
  RIGHT:1,
  UP:   2,
  DOWN: 3
})

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
  return [...Array(hi-lo).keys()].map(i => i+lo);
};
R = range(GAME_SIZE);
C = range(GAME_SIZE);
crossProduct = (rows, cols) => rows.flatMap(i => cols.map(j => [i,j]));
allCoordinates = crossProduct(R, C);

nullMatrix = (rows, cols) => rows.map(_ => cols.map(_ => null));
getNullMatrix = (nrow, ncol) => nullMatrix(range(nrow), range(ncol));

/*
allCoordinates = ((rows, cols) => {
  return Array(rows).fill().map((_, x) => 
    Array(cols).fill().map((_, y) => [x, y])
  ).flat();
})(GAME_SIZE, GAME_SIZE);

getNullMatrix = ((rows, cols) => {
  // return Array(GAME_SIZE).fill(Array(GAME_SIZE).fill(null)) // it is buggy with this line, 
  return Array.from({length:rows}, ()=>Array(cols).fill(null));
});
*/

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
  // {2, n, n, 2} => {4, n, n, n}

  // {2, 2, 2, n} => {4, 2, n, n}
  // {4, 2, 2, n} => {4, 4, n, n}
  // {2, 2, 4, n} => {4, 4, n, n}

  // {2, 2, 2, 2} => {4, 4, n, n}
  // {2, 2, 4, 2} => {4, 4, 2, n}
  // {2, 4, 2, 2} => {2, 4, 4, n}
  shiftBlock(arr, d) {
    if (d === DIR.RIGHT) {
      arr.reverse();
      this.shiftBlock(arr, DIR.LEFT);
      arr.reverse();
    }
    else if (d=== DIR.LEFT || d === undefined) {
      for(let i, j; i < arr.length; ) {
        for(i = 0;   i < arr.length && arr[i] === null; ++i) {}
        if (i === arr.length) break;
        for(j = i+1; j < arr.length && arr[j] === null; ++j) {}
        if (j === arr.length) break;

        if (arr[i] === arr[j]) {
          arr[i] *= 2;
          arr[j] = null;
          i = j + 1;
        }
        else {
          i = j;
        }
      }
      // move all of the null back
      for(let i = 0, null_cnt = 0; i<arr.length; ++i) {
        if (arr[i] === null) ++null_cnt;
        else {
          [arr[i-null_cnt], arr[i]] = [arr[i], null];
        }
      }
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