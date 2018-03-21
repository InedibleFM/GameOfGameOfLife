/*jshint esversion: 6 */
let gogolImage;

function setupStartscreen() {
  gogolImage = loadImage("images/gogol.jpg");
}

function showStartscreen() {
  background(255);
  fill(30);
  textSize(32);
  text("Game of Game of Life",50,50);
  text("Total born cells: "+born+(farmerLevel == "" ? "" : " ("+farmerLevel+")"), 450, 50);
  image(gogolImage, 100,100, gogolImage.width*0.7, gogolImage.height*0.7);
}
