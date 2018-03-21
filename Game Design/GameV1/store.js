/*jshint esversion: 6 */

let itemsDisplayed = 0;
let displayedPurchasables = 4;

/* --------------------STORE ITEMS---------------------*/

let St_multiplier1 =  {title:"Marketing strategy",        cost:5000,        multip:1.2, harvesting: 0,  text:"Multiplier +20%",         gridX:0, gridY:0};
let St_multiplier2 =  {title:"Infrastructure upgrade",    cost:15000,       multip:1.5, harvesting: 0,  text:"Multiplier +50%",         gridX:0, gridY:0};
let St_grid1 =        {title:"Bigger house",              cost:20000,       multip:1,   harvesting: 0,  text:"Expand farm",             gridX:5, gridY:5};
let St_capacity1 =    {title:"Fridge",                    cost:45000,       multip:1,   harvesting: 7,  text:"Harvesting capacity +7",  gridX:0, gridY:0};
let St_multiplier3 =  {title:"Better marketing strategy", cost:60000,       multip:2,   harvesting: 0,  text:"Multiplier +100%",        gridX:0, gridY:0};
let St_multiplier4 =  {title:"Hire marketer",             cost:100000,      multip:1.1, harvesting: 0,  text:"Multiplier +10%",         gridX:0, gridY:0};
let St_multiplier5 =  {title:"Hire Nanobiologist",        cost:200000,      multip:1.2, harvesting: 0,  text:"Multiplier +20%",         gridX:0, gridY:0};
let St_capacity2 =    {title:"Fridge",                    cost:30000,       multip:1,   harvesting: 9,  text:"Harvesting capacity +9",  gridX:0, gridY:0};
let St_multiplier6 =  {title:"Replace Nanobiologist",     cost:300000,      multip:1.3, harvesting: 0,  text:"Multiplier +30%",         gridX:0, gridY:0};


let purchasables = [St_multiplier1, St_multiplier2, St_grid1, St_capacity1, St_multiplier3, St_multiplier4, St_multiplier5, St_capacity2, St_multiplier6];

/* -------------------------------------------------*/

let canBuy = [];
let storeButton = [];
let daadwStore;

function storeItems() {
  //total displayed items: 4
  if (itemsDisplayed < displayedPurchasables) {
    document.getElementById("actualStore").innerHTML = "";
    itemsDisplayed = 0;
    daadwStore = document.getElementById("actualStore");

    if (purchasables.length < displayedPurchasables)
      displayedPurchasables = purchasables.length;

    for (let i = 0; i<displayedPurchasables; i++) {
      storeButton[i] = document.createElement("BUTTON");

      let tekst_title = document.createElement("P");
      let subtekst_title = document.createTextNode(purchasables[i].title);
      tekst_title.style.cssText = "font-size: 28;";
      tekst_title.appendChild(subtekst_title);

      let tekst_upgrade = document.createElement("P");
      let subtekst_upgrade = document.createTextNode(purchasables[i].text);
      tekst_upgrade.style.cssText = "font-weight: normal;";
      tekst_upgrade.appendChild(subtekst_upgrade);

      let tekst_cost = document.createElement("P");
      let subtekst_cost = document.createTextNode(" Cost: "+purchasables[i].cost+" bCells");
      tekst_cost.appendChild(subtekst_cost);

      storeButton[i].appendChild(tekst_title);
      storeButton[i].appendChild(tekst_upgrade);
      storeButton[i].appendChild(tekst_cost);

      storeButton[i].onclick = function(){buyItem(purchasables[i],i);return false;}; //Werkt niet anders, for some reason
      daadwStore.appendChild(storeButton[i]);

      itemsDisplayed++;
    }
  }
  for (let i = 0; i<displayedPurchasables; i++) {
    if (bCells >= purchasables[i].cost && canBuy[i] != 1){
      canBuy[i] = 1;
      // Make the style of button different if item is purchasable
      storeButton[i].style.cssText = "opacity: 1;";
      storeButton[i].style.color = "#53618C";
    }
    else
      canBuy[i] = 0;
  }
}

function buyItem(item,i){
  if (bCells >= item.cost) {
    bCells -= item.cost;
    multiplier = multiplier*item.multip;
    document.getElementById('mutliplierText').innerHTML = "Multiplier: "+ multiplier.toFixed(2);
    harvestCapacity += item.harvesting;

    displayStemCells();
    if (item.multip)
      addConsoleText("Multiplier times "+item.multip+"!", "#e8e8ff", "#000363");

    if (item.harvesting)
      addConsoleText("Harvesting capacity plus "+item.harvesting+"!", "#e8e8ff", "#000363");

    if (item.gridX || item.gridY)
    {
      addConsoleText("Grid size plus ("+item.gridX+","+item.gridY+")!", "#e8e8ff", "#000363");
      gridWidth += item.gridX*blockSize;
      gridHeight += item.gridY*blockSize;
      makeNewCellsEmpty(item.gridX, item.gridY);
      calculateGrid();
      drawCells();
    }

    purchasables.splice(i,1);
    itemsDisplayed--;
    storeItems();
  }
  else
    addConsoleText("You do not have enough bCells","#ffb3b3", "#660000");
}

function makeNewCellsEmpty(extraX, extraY) {
  for (let i = 0; i < cols; i++)
    for (let j = 0; j < extraY; j++) {
      index[i].push(0);
      insert_grid[i].push(0);
    }
  for (let i = 0; i < extraX; i++) {
    index.push(new Array(rows+extraY));
    for (let j = 0; j < rows+extraY; j++) {
      index[cols+i][j] = 0;
      insert_grid[cols+i][j] = 0;
    }
  }
}

/***************   SWITCH STORE AND SPAWNS **************************/
let storeSwitchButton, spawnsSwitchButton, spawnsDiv;
function setupStoreSpawnsSwitcher(){
  switchingBorder = document.getElementById("storeMenuOverlayBorder");
  spawnsDiv = document.getElementById("spawns");

  spawnsDiv.style.display = "none";
}

function switchToStore() {
  daadwStore.style.display = "block";
  spawnsDiv.style.display = "none";
  switchingBorder.style.cssText = "-webkit-transform: scaleX(1);transform: scaleX(1);";
}

function switchToSpawns() {
  daadwStore.style.display = "none";
  spawnsDiv.style.display = "block";
 switchingBorder.style.cssText = "-webkit-transform: scaleX(-1);transform: scaleX(-1);";
}
