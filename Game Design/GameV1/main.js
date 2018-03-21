// Game of Life
/*jshint esversion: 6 */

let fr = 30;
let prev_fr = fr;
let fraemraet = 0;
let newframe = false;

//Size of grid
let gridWidth = 850;
let gridHeight = 650;

//Size of each block
let blockSize = 16;
let cols, rows, blockAmount;
let offset = 16;

let canvasWidth = gridWidth+2*offset;
let canvasHeight = gridHeight+2*offset;

let insertion_mode = false;
let insert_grid;
let index;
let bornCurrent = 0;

//currencies
let stemCells = 20000; // start with 20000
let bCells = 0;
let multiplier = 1;

let cellDecayRate = 1;
let harvestCapacity = 9;


//Make a 2d array for the state of the cells
function make2Darray(colsA, rowsA) {
  let cellState = [];
  for (let i = 0; i < cols; i++) {
    cellState.push(new Array(rowsA));
    cellState[i].fill(0);
  }
  return cellState;
}

function calculateGrid() {
  cols = Math.floor(gridWidth/blockSize);
  rows = Math.floor(gridHeight/blockSize);
  blockAmount = cols*rows;
}

//GameStats
let deadCellAmount = 0;
let liveCellAmount = 0;

let generations = 0;
let born = 0;
let birthRate = 0; //births per tick/generation
let died = 0;

// buttons
let button_clear, button_reset;

function drawSingleCell(i, j, alive) {
  let x = i*blockSize + offset;
  let y = j*blockSize + offset;
  strokeWeight(1);
  stroke(colorBottomBg);
  if (insertion_mode) {
    fill(255);
    rect(x, y, blockSize, blockSize);
    if (insert_grid[i][j])
      fill(alive == 1 ? colorBottomBdr : colorMenuLine);
    else
      fill(alive == 1 ? 'rgba(146, 199, 148, 0.5)' : 255);
  } else {
    fill(alive == 1 ? colorMenuLine : 255);
  }
  rect(x, y, blockSize, blockSize);
}

function drawCells() {
  // strokeWeight(1.5);
  // stroke(colorBottomBdr);
  // noFill();
  // rect(offset,offset,cols*blockSize, rows*blockSize);
  background(255);
  liveCellAmount = 0;
  deadCellAmount = 0;
  for (let i = 0; i < cols; i ++) {
    for (let j = 0; j < rows; j ++) {
      liveCellAmount += index[i][j];
      drawSingleCell(i,j,index[i][j]);
    }
  }
  deadCellAmount = blockAmount - liveCellAmount;
}

function createSeed() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let alive = floor(random(2));
      drawSingleCell(i,j,alive);
      index[i][j] = alive;
    }
  }
  if (!fr)
    drawCells();
}

function conway() {
  bornCurrent = 0;
  liveCellAmount = 0;
  let newState = make2Darray(cols, rows);
  for (let i = 0; i < cols; i++)
    newState[i] = index[i].slice();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let neighbours = countNeighbours(i, j, index);
      //for a living cell
      if (index[i][j]) {
        if (neighbours < 2 || neighbours > 3) {
          newState[i][j] = 0;
          drawSingleCell(i,j,0);
          died++;
        }
      } else if (neighbours == 3) {
        newState[i][j] = 1;
        drawSingleCell(i,j,1);
        born++;
        bornCurrent++;
      }
      liveCellAmount += newState[i][j];
    }
  }
  index = newState;
  deadCellAmount = blockAmount - liveCellAmount;
}

function countNeighbours (x,y,state){
  neighbours = 0;
  for (let k = -1; k < 2; k++){
    for (let l = -1; l < 2; l++) {
      //edges
      if (x+k >= 0 && y+l >= 0 && x+k < cols && y+l < rows)
          neighbours += state[x+k][y+l];
    }
  }
  neighbours -= state[x][y];
  return neighbours;
}

function applyInsertionSlide() {
  for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++)
      if (insert_grid[i][j]) {
          index[i][j] ^= 1;
          insert_grid[i][j] = 0;
      }
}

function mousePressed() {
  let x = Math.floor((mouseX-offset)/blockSize);
  let y = Math.floor((mouseY-offset)/blockSize);
  if (x >= 0 && y >= 0 && x < cols && y < rows && activeMenuButton == button_grid && fr) {
    if ((insertion_mode && stemCells) || (insertion_mode && insert_grid[x][y])) {
      insert_grid[x][y] ^= 1;
      stemCells -= insert_grid[x][y] == 1 ? 1 : -1;
    } else if (stemCells) {
      index[x][y] ^= 1;
      stemCells--;
    }
    drawSingleCell(x,y, index[x][y]);
    displayStemCells();
  }
}

function newFPS() {
  fraemraet += fr / frameRate();
  if (isNaN(fraemraet))
    fraemraet = 0;
  else if (fraemraet > 1) {
    fraemraet %= 1;
    newframe = true;
  }
}

function countBcells() {
  bCells += round(birthRate * multiplier);
}

function gameBox() {
  if (activeMenuButton == button_grid && newframe) {
    conway();
  }
  if (activeMenuButton != prevMenuButton) {
    if (activeMenuButton == button_grid) {
      background(255);
      drawCells();
      playpause();
    } else {
      if (activeMenuButton == button_startscreen)
        showStartscreen();
      if (activeMenuButton == button_achievements)
        showAchscreen();
      pause();
    }
  }
  prevMenuButton = activeMenuButton;
}

function windowResized() { //triggers when window is resized
 // do something with the canvas (scrolling/zooming buttons?)
}

//*********************** Execution ******************F******//
let gospertxt, blinkerfarmtxt, glidertxt;
function txtLoad() {
  gospertxt = loadStrings("txtPatterns/gosper.txt");
  blinkerfarmtxt = loadStrings("txtPatterns/blinkerfarm.txt");
  glidertxt = loadStrings("txtPatterns/glider.txt");
  loaftxt = loadStrings("txtPatterns/loaf.txt");
  tubtxt = loadStrings("txtPatterns/tub.txt");
  pulsareggtxt = loadStrings("txtPatterns/pulsaregg.txt");
  beacontxt = loadStrings("txtPatterns/beacon.txt");
}

function setup() {
  setupStoreSpawnsSwitcher();
  calculateGrid();
  let cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent('gamebox');
  background(255);
  calculateGrid();
  index = make2Darray(cols, rows);
  insert_grid = make2Darray(cols, rows);
  createSeed();
  createButtons();
  menuButtons();
  createFpsSlider();
  setupStartscreen();
  dataRule();
  displayStemCells();
  addConsoleText("Welcome to Game of Game of Life!", "#fce19f", "#44391f");
  txtLoad();
}

function draw() {
  newFPS();
  gameBox();
  showFps();
  buttons();
  pressedMenuButtons();
  checkAchievements();
  storeItems();
  decayStemCells();
  if (newframe) {
    countBcells();
    generations++;
    newframe = false;
  }
  dataRule();
  if (shadowCounter >= 2) { // make shadow animatingly return to 2px
    //activeMenuButton.style("box-shadow", "0px "+shadowCounter+"px #FF7878,inset 2px -2px 0px 0px #FF7878, inset 0px "+(menuButtonList.indexOf(activeMenuButton) ? 2 : 0)+"px 0px 0px #FF7878");
    activeMenuButton.style("box-shadow", "0px "+shadowCounter+"px "+colorMenuLine+",inset 2px -2px 0px 0px "+colorMenuLine+", inset 0px "+(menuButtonList.indexOf(activeMenuButton) ? 2 : 0)+"px 0px 0px "+colorMenuLine);
    activeMenuButton.style("z-index", "1");
    shadowCounter--;
  }
}
