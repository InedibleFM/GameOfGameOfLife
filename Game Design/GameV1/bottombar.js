/*jshint esversion: 6 */
//*********************** SEEDS ******************** //
function gosper() {
  text_to_cells(gospertxt, 5, 5);
  if (activeMenuButton != button_grid)
    switchmenu(button_grid);
  drawCells();
  addConsoleText("Created Gosper Glider Gun", "white", "black");
}

function blinkerfarm() {
  text_to_cells(blinkerfarmtxt, 5, 5);
  if (activeMenuButton != button_grid)
    switchmenu(button_grid);
  drawCells();
  addConsoleText("Created blinkerfarm", "white", "black");
}

function glider() {
  text_to_cells(glidertxt, 5, 5);
  if (activeMenuButton != button_grid)
    switchmenu(button_grid);
  drawCells();
  addConsoleText("Created glider", "white", "black");
}

function beacon() {
  text_to_cells(beacontxt, 15, 15);
  if (activeMenuButton != button_grid)
    switchmenu(button_grid);
  drawCells();
  addConsoleText("Created beacon", "white", "black");
}

function tub() {
  text_to_cells(tubtxt, 5, 5);
  if (activeMenuButton != button_grid)
    switchmenu(button_grid);
  drawCells();
  addConsoleText("Created beacon", "white", "black");
}

function loaf() {
  text_to_cells(loaftxt, 5, 5);
  if (activeMenuButton != button_grid)
    switchmenu(button_grid);
  drawCells();
  addConsoleText("Created beacon", "white", "black");
}

function pulsaregg() {
  text_to_cells(pulsareggtxt, 15, 15);
  if (activeMenuButton != button_grid)
    switchmenu(button_grid);
  drawCells();
  addConsoleText("Created beacon", "white", "black");
}

function text_to_cells (textfile, ofstx, ofsty) {
  for (let i = 0; i < textfile.length; i++)
    for (let j = 0; j < textfile[i].length; j++)
      if (textfile[i].charAt(j) == '*')
        index[j+ofsty][i+ofstx] = 1;
}


function dataRule() {
  birthRate = bornCurrent;
  document.getElementById('blockamount').innerHTML = blockAmount;
  document.getElementById('living').innerHTML = liveCellAmount;
  document.getElementById('dead').innerHTML = deadCellAmount;
  document.getElementById('generations').innerHTML = generations;
  document.getElementById('died').innerHTML = died;
  document.getElementById('born').innerHTML = born;
  document.getElementById('birthrate').innerHTML = birthRate;
  document.getElementById('bCellText').innerHTML = bCells + " bCells";
}

function createButtons() {
  button_clear = select('#cleargridbutton');
  button_reset = select('#randomseedbutton');
  // button_slide = select('#toggleslidebutton');
  button_gosper = select("#gosperbutton");
  button_blinkerfarm = select("#blinkerfarmbutton");
  button_tub = select("#tubbutton");
  button_loaf = select("#loafbutton");
  button_beacon = select("#beaconbutton");
  button_pulsaregg = select("#pulsareggbutton");
}

function buttons() {
  button_clear.mousePressed(cleargrid);
  button_reset.mousePressed(createSeed);
  // button_slide.mousePressed(changeStateInsertionSlide);
  button_gosper.mousePressed(gosper);
  button_blinkerfarm.mousePressed(blinkerfarm);
  button_tub.mousePressed(tub);
  button_loaf.mousePressed(loaf);
  button_beacon.mousePressed(beacon);
  button_pulsaregg.mousePressed(pulsaregg);
}

function createFpsSlider() {
  fpsSlider = select('#slider');
  fpsSlider.value(fr);
  // fpsSlider.setAttribute("max", 40);
  // fpsSlider.setAttribute("min", 1);
}

function changeStateInsertionSlide(t) {
  if (insertion_mode) {
    applyInsertionSlide();
    t.style.cssText = "background-color:white;";
    t.innerHTML = "Activate Insertion Mode";
  } else {
    t.style.cssText = "background-color:#92C794;";
    t.innerHTML = "Apply Insertion Slide";
  }
  insertion_mode = !insertion_mode;
  drawCells();
}

function showFps () {
  textSize(20);
  fill(50);
  if(fr) {
    fr = fpsSlider.value();
    document.getElementById('framerate').innerHTML = fr;
  } else {
    document.getElementById('framerate').innerHTML = "Paused";
  }
}

function displayStemCells(){
  document.getElementById('stemCells').innerHTML = stemCells+"/"+harvestCapacity;
}

let removeCounter = 0;

function decayStemCells(){
  if (stemCells>harvestCapacity && newframe){
    removeCounter += cellDecayRate*((stemCells-harvestCapacity)/100);
    //print(removeCounter);
    if (removeCounter >= 1) {
      stemCells -= Math.floor(removeCounter);
      removeCounter %= 1;
    }
    displayStemCells();
  }
  // fraemraet += fr / frameRate();
  // if (isNaN(fraemraet))
  //   fraemraet = 0;
  // else if (fraemraet > 1) {
  //   fraemraet %= 1;
  //   newframe = true;
  // }
}

function cleargrid() {
  let harv = 0;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      harv += index[i][j];
      index[i][j] = 0;
    }
  }
  //add stemCells
  stemCells += harv;
  drawCells();
  displayStemCells();
  if (harv)
    addConsoleText("Harvested "+harv.toString()+ " StemCells", "white", "black");
  else
    addConsoleText("Harvested no StemCells", "#ffb3b3", "#660000");
}

function pause() {
  if (fr) {
    prev_fr = fr;
    fr = 0;
    newframe = false;
    if (occursAfter("Resumed", "Paused"))
      addConsoleText("Paused", "white", "black");
    document.getElementById("playpausebutton").innerHTML = "Play";
  }
}

function start() {
  fr = prev_fr;
  if (occursAfter("Paused", "Resumed"))
    addConsoleText("Resumed", "white", "black");
  else if (eventlog.length == 1)
    addConsoleText("Started", "white", "black");
  document.getElementById("playpausebutton").innerHTML = "Pause";
}

function occursAfter(s, t) {
  for (let i = eventlog.length-1; i >= 0; i--)
    if (eventlog[i] == s || eventlog[i] == "Started")
      return true;
    else if (eventlog[i] == t)
      return false;
  return false;
}

function playpause() {
  if (activeMenuButton != button_grid)
    switchmenu(button_grid);
  else {
    if (fr)
      pause();
    else
      start();
  }
}
