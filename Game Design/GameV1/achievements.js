/*jshint esversion: 6 */

// Achievements for amount of born bCells
let Ach_Newbie, Ach_Novice, Ach_Rookie, Ach_Beginner, Ach_Talented, Ach_Skilled, Ach_Intermediate,
Ach_Skillful, Ach_Seasoned, Ach_Proficient, Ach_Experienced, Ach_Advanced, Ach_Senior, Ach_Expert;


let AchievementsList = [];
let AchListLetters = ["NEW", "NOV", "ROO", "BEG"];

// current level
let farmerLevel = "";

function checkAchievements() {
  if(born>100 && Ach_Newbie!=1){
    addConsoleText("Achievement unlocked: Newbie Farmer! (>100 cells born)", "#f3ffef", "#175900");
    farmerLevel = "Newbie";
    Ach_Newbie = 1;
    AchievementsList[0]=1;
  }

  if(born>1000 && Ach_Novice!=1){
    addConsoleText("Achievement unlocked: Novice Farmer! (>1000 cells born)", "#f3ffef", "#175900");
    farmerLevel = "Novice";
    Ach_Novice = 1;
    AchievementsList[1]=1;
  }

  if(born>10000 && Ach_Rookie!=1){
    addConsoleText("Achievement unlocked: Rookie Farmer! (>10000 cells born)", "#f3ffef", "#175900");
    farmerLevel = "Rookie";
    Ach_Rookie = 1;
    AchievementsList[2]=1;
  }

  if(born>100000 && Ach_Beginner!=1){
    addConsoleText("Achievement unlocked: Beginner Farmer! (>100000 cells born)", "#f3ffef", "#175900");
    farmerLevel = "Beginner";
    Ach_Beginner = 1;
    AchievementsList[3]=1;
  }
}

let Ach_border=5;
let AchievementNumber;

function showAchscreen(){
  background(255);
  fill(30);
  textSize(32);
  text("Achievements",50,50);
  strokeWeight(0);
  for (let i=0; i<7; i++){
    for(let j=0; j<10; j++){
      AchievementNumber = j+i*10;
      textSize(24);
      if (AchievementsList[AchievementNumber]){ // When achievement is unlocked
        fill(0,100,0);
        rect(50+j*80,100+i*80,70,70);
        fill(0,160,0);
        rect(50+j*80+Ach_border,100+i*80+Ach_border,70-2*Ach_border,70-2*Ach_border);
        fill(0);
        text(AchListLetters[AchievementNumber],53+j*80+Ach_border,138+i*80+Ach_border);
      }
      else{
        fill(100);
        rect(50+j*80,100+i*80,70,70);
        fill(130);
        rect(50+j*80+Ach_border,100+i*80+Ach_border,70-2*Ach_border,70-2*Ach_border);
        fill(0);
        text("?",73+j*80+Ach_border,138+i*80+Ach_border);
      }
    }
  }
}
