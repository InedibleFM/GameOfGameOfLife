/*jshint esversion: 6 */
let consol, para, node, time, consoleCounter = 0;
let seconds, hours, minutes;
let eventlog = [];

function addConsoleText(consEvent, textColor, textHighlight) {
  consoleCounter++;

  consol = document.getElementById("console");
  para = document.createElement("p");
  para.style.color = textColor;
  para.style.backgroundColor = textHighlight;

  // Get the time
  let d = new Date();
  hours = d.getHours().toString();
  if (d.getHours()<10)
    hours = "0"+hours;
  minutes = d.getMinutes().toString();
  if (d.getMinutes()<10)
    minutes = "0"+minutes;
  seconds = d.getSeconds().toString();
  if (d.getSeconds()<10)
    seconds = "0"+seconds;

  // express time
  time = hours+":"+minutes+":"+seconds;
  node = document.createTextNode(time+" "+consEvent);
  para.appendChild(node);
  consol.appendChild(para);
  eventlog.push(consEvent);

  if (consoleCounter > 30) {
    consol.removeChild(consol.childNodes[0]); // 20 maximum items displayed
    eventlog.splice(0,1);
  }

  consol.scrollTop = consol.scrollHeight; // Always scroll to the bottom
}
