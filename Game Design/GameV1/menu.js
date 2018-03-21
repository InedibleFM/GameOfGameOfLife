/*jshint esversion: 6 */
let colorMenu = "#F4F9F1"; //red: #FFE8E8
let colorMenuLine = "#92C794"; //red: #FF7878
let colorBottomBdr = "#9B9EB9";
let colorBottomBg = "#D8DCE9";

let button_startscreen, button_grid, button_slide, button_achievements, button_catalogue,
    button_locked1, button_locked2, button_locked3, button_locked4;
let activeMenuButton, prevMenuButton;
let menuButtonList = [];
let shadowCounter;

function menuButtons() { //create menubuttons
  button_startscreen = select('#startscreenbutton');
  button_grid = select('#gridbutton');
  button_achievements = select('#achievementsbutton');
  button_catalogue = select('#cataloguebutton');
  button_locked1 = select('#locked1button');
  button_locked2 = select('#locked2button');
  button_locked3 = select('#locked3button');
  button_locked4 = select('#locked4button');
  menuButtonList = [button_startscreen, button_grid, button_achievements, button_catalogue, button_locked1, button_locked2, button_locked3, button_locked4];

  //start at the startscreen
  activeMenuButton = button_startscreen;
  prevMenuButton = "";
  button_startscreen.style("background-color","white");
  button_startscreen.style("border-radius","0px 0px 0px 10px");
  button_startscreen.style("border-right","0px");
  button_startscreen.style("border-top","0px");
  button_startscreen.style("z-index", "1");
  button_startscreen.style("box-shadow", "0px 2px "+colorMenuLine+", inset 2px -2px 0px 0px "+colorMenuLine);
}

function pressedMenuButtons() { //execute buttonpressed() when a button is pressed
  for (i = 0; i < menuButtonList.length; i++)
    menuButtonList[i].mousePressed(buttonpressed);
}

function buttonpressed() {
  activeMenuButton.style("background-color", colorMenu);
  activeMenuButton.style("box-shadow", "inset -2px 0px 0px 0px "+colorMenuLine);
  activeMenuButton.style("border-radius","0px");this.style("background-color","#FFF");
  activeMenuButton.style("z-index", "0");
  this.style("z-index", "1");
  this.style("border","0px");
  this.style("border-radius",(this == button_startscreen ? "" : "1")+"0px 0px 0px 10px");
  this.style("box-shadow", "0px 10px "+colorMenuLine+", inset 2px -2px 0px 0px "+colorMenuLine+", inset 0px "+(this == button_startscreen ? "2" : "0")+"px 0px 0px "+colorMenuLine);
  shadowCounter = 10;
  activeMenuButton = this;
}

function switchmenu(menu) {
  activeMenuButton.style("background-color",colorMenu);
  activeMenuButton.style("box-shadow", "inset -2px 0px 0px 0px "+colorMenuLine);
  activeMenuButton.style("z-index", "0");
  menu.style("z-index", "1");
  menu.style("background-color","#FFF");
  menu.style("border","0px");
  menu.style("border-radius",(menu == button_startscreen ? "" : "1")+"0px 0px 0px 10px");
  menu.style("box-shadow", "0px 10px "+colorMenuLine+", inset 2px -2px 0px 0px "+colorMenuLine+", inset 0px "+(menuButtonList.indexOf(this) ? 2 : 0)+"px 0px 0px "+colorMenuLine);
  shadowCounter = 2;
  activeMenuButton = menu;
}
