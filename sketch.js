var population = [];


//Triangle data

var tx1;
var tx2;
var tx3;
var ty1;
var ty2;
var ty3;
var k;

//Sizes and Dimensions
var populationSize;
var personSize;
var canvasWidth;
var canvasHeight;
var offset;
var fRate = 40;

// Population Characteristics
var healthy;
var infected;
var maxInfected;
var recovered;
var dead;
var mvFreq;
var speed;
var quarantine;
var quarantineStop;
var quarantineMov;
var normalStop;
var normalMov;
var hospitalCapacity;

// Time Tracking
var startTime;
var currentDay;
var dayTime;
var nightTime;
var night;
var summaryFreq;
var summarizing;
var updatingId;
var movingId;
var endResult;

//Chart parameters
var healthyHistory;
var infectedHistory;
var recoveredHistory;
var deadHistory;
var hospitalCapHistory;
var yLabels;
var fontColors;
var flag;
var flag2;
var insideTriangle;

//Visual Characteristics
var healthyColor = 'rgba(20, 100, 20, 0.65)';
var infectedColor = 'rgba(100, 20, 20, 0.65)';
var recoveredColor = 'rgba(20, 20, 135, 0.7)';
var deadColor = 'rgba(0, 0, 0, 0.70)';

// Virus Data
var recoveryRate;
var deathRate;
var complicationRate;


// Initialization Function

function setup() {

  background(255);
  population = [];
  insideTriangle = false;
  
  
  //
  canvasWidth = windowWidth;
  canvasHeight = windowHeight;
  populationSize = Math.floor(Math.max(canvasWidth, canvasHeight) / 200) * 100;
  populationSize = isMobile() ? Math.min(500, populationSize) : populationSize;
  personSize = 10;
  offset = personSize / 2;
  
  //
  
  tx1 = canvasWidth / 2;
  ty1 = canvasHeight - 30;
  tx2 = canvasWidth / 2 + 15;
  ty2 = canvasHeight + 1;
  tx3 = canvasWidth / 2 - 15;
  ty3 = canvasHeight + 1;
  k = 0;
  //
  infected = 2;
  maxInfected = infected;
  healthy = populationSize - infected;
  recovered = 0;
  dead = 0;
  mvFreq = 100;
  speed = 1.5;
  quarantine = false;
  quarantineStop = 0.025;
  quarantineMov = 0.012;
  normalStop = 0.015;
  normalMov = 0.020;
  hospitalCapacity = Math.floor(populationSize / 3);

  //
  currentDay = 1;
  dayTime = 1.1;
  summaryFreq = 14;
  summarizing = false;
  endResult = false;

  //
  healthyHistory = [healthy];
  infectedHistory = [infected];
  recoveredHistory = [recovered];
  deadHistory = [dead];
  hospitalCapHistory = [hospitalCapacity];
  let firstDay = "1 " + (quarantine ? "(Q)" : "(N)")
  yLabels = [firstDay];
  fontColors = [quarantine ? healthyColor : infectedColor];
  flag = true;
  flag2 = true;
  flag3 = true;

  //
  recoveryRate = 0.9;
  deathRate = 0.05;
  complicationRate = 0.1;

  frameRate(fRate);
  createCanvas(canvasWidth, canvasHeight);

  createPopulation();
  infectIndividuals();
  updatingId = setInterval(update, dayTime * 1000);
  movingId = setInterval(main, 1000 / fRate);
}

function main() {
  if (document.visibilityState == "hidden") {
    for (let i = 0; i < fRate; i++) {
      _main();
    }
  } else
    _main();
}

function _main() {
  if (!summarizing) {
    flag = true;
    background(255);
    wakeUp();
    updateText();
  }
  summary();
}

//Updating data each day
function update() {
  //let currentTime = second();
  //if (startTime == -1 || (startTime + dayTime) % 60 == currentTime ) {
  //startTime = currentTime;
  currentDay++;
  updateDataHistory();
  //}
}

// Loop Function
function draw() {
  if (infected == 0) {
    endResult = true;
    clearInterval(movingId);
    clearInterval(updatingId);
    fadeIn();
    if (flag2) {
      flag2 = false;
      setTimeout(result, 800);
    }
  }
}

//Moving and Interacting with other people
function wakeUp() {
  night = false;
  for (let p = 0; p < populationSize; p++) {
    population[p].move();
    population[p].evolve();
    if (quarantine) {
      population[p].inQuarantine = true;
    } else {
      population[p].inQuarantine = false;
    }
  }
}





function updateText() {
  
  noStroke();
  textSize(28);
  fill(0, 0, 0, 180);
  text('Day ' + currentDay, 10, 30);
  textSize(15);
  text('Initial Population: ' + populationSize, 10, 55);
  text('Hospitals Capacity: ' + hospitalCapacity, 10, 75);
  fill(0, 0, 0, 180);
  textSize(20);
  text('State: ', 5, canvasHeight - 7.3);
  if (quarantine) {
    fill(quarantineColor());
    text('Quarantine ', 58, canvasHeight - 7);
  } else {
    fill(noquarantineColor());
    text('No Quarantine ', 58, canvasHeight - 7);
  }
  makeTriangle();
  noStroke();
  textSize(20);
  fill(healthyColor);
  text('Healthy: ' + healthy, canvasWidth - 140, 25);
  fill(infectedColor);
  text('Infected: ' + infected, canvasWidth - 140, 50);
  fill(recoveredColor);
  text('Recovered: ' + recovered, canvasWidth - 140, 75);
  fill(deadColor);
  text('Dead: ' + dead, canvasWidth - 140, 100);
}

//Creates a population
function createPopulation() {
  for (let i = 0; i < populationSize; i++) {
    let x = rand(offset, canvasWidth - offset);
    let y = rand(offset, canvasHeight - offset);
    let tempPerson = new person(x, y, i);
    let intersect = false;
    for (let j = 0; j < i; j++) {
      let existingPerson = population[j];
      if (touching(tempPerson, existingPerson)) {
        intersect = true;
        break;
      }
    }
    if (!intersect) {
      population.push(tempPerson);
    } else {
      i--;
    }
  }
}

function infectIndividuals() {
  for (let i = 0; i < infected; i++) {
    population[i].infected = true;
  }
}

function rand(max, min) {
  return Math.random() * (max - min) + min;
}

function distSquared(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  return dx * dx + dy * dy;
}

function touching(a, b) {
  return distSquared(a.x, a.y, b.x, b.y) <= personSize * personSize;
}

function summary() {
  if (currentDay % summaryFreq == 0) {
    summarizing = true;
    clearInterval(updatingId);
    fadeIn();
    document.body.style.cursor ='default';
    if (flag) {
      //let tempId = setInterval(fadeIn,25);
      flag = false;
      setTimeout(function() {
        flag3 = false;
        //noLoop();
        //updateDataHistory();
        //clearInterval(tempId);
        for (let i = 0; i < fRate; i++) {
          fadeIn();
        }
        clearInterval(movingId);
        //needChart=true;
        makeChart();
      }, 800);
      setTimeout(makeButton, 1500);
    }

  }
}

function makeChart() {
  if (endResult) {
    document.getElementById("chart-container").style.width = (canvasWidth * 0.6).toString() + "px";
    document.getElementById("chart-container").style.right = (canvasWidth * 0.4).toString() + "px";
  } else {
    document.getElementById("chart-container").style.width = (canvasWidth * 0.9).toString() + "px";
  }

  document.getElementById("chart-container").style.top = (canvasHeight / 6).toString() + "px";
  var chartCanvas = document.createElement("CANVAS");
  chartCanvas.id = 'myChart';
  document.getElementById("chart-container").appendChild(chartCanvas)
  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: yLabels,
      datasets: [{
        label: "Hospitals Capacity",
        backgroundColor: 'rgba(255,255,255,0)',
        borderColor: 'orange',
        data: hospitalCapHistory,
      }, {
        label: "Infected",
        backgroundColor: infectedColor,
        borderColor: infectedColor,
        data: infectedHistory,
      },{
        label: "Dead",
        backgroundColor: deadColor,
        borderColor: deadColor,
        data: deadHistory,
      }, {
        label: "Recovered",
        backgroundColor: recoveredColor,
        borderColor: recoveredColor,
        data: recoveredHistory,
      }, {
        label: "Healthy",
        backgroundColor: healthyColor,
        borderColor: healthyColor,
        data: healthyHistory,
      }]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          ticks: {

          }
        }]
      }
    }
  });
}

function makeButton() {
  button = createButton('Continue');
  button.position(canvasWidth - 100, canvasHeight / 30);
  button.style('margin', '0');
  button.style('transform', 'translate(-40%, 0%)');
  button.style('font-size', '12px');
  button.style('position', 'absolute');
  button.style('border', 'none');
  button.style('background', '#505050');
  button.style('color', '#ffffff');
  button.style('text-transform', 'uppercase');
  button.style('padding', '5px');
  button.style('border-radius', '6px');
  button.style('display', 'inline-block');
  button.style('transition', 'all 0.8s ease 0s');

  button.mouseOver(function() {
    button.style('cursor', 'pointer');
    button.style('color', '#404040');
    button.style('letter-spacing', '3px');
    button.style('display', 'inline-block');
    button.style('background', 'none');
    button.style('-webkit-box-shadow', '0px 5px 40px -10px rgba(0,0,0,0.57)');
    button.style('-moz-box-shadow', '0px 5px 40px -10px rgba(0,0,0,0.57)');
    button.style('transition', 'all 0.3s ease 0s');
  });

  button.mouseOut(function() {
    button.style('letter-spacing', '0');
    button.style('background', '#505050');
    button.style('color', '#ffffff');
    button.style('transition', 'all 0.3s ease 0s');
  });

  button.mousePressed(function() {
    var container = document.getElementById("chart-container");
    container.removeChild(container.childNodes[0]);
    container.removeChild(container.childNodes[1]);
    button.remove();
    for (let i = 0; i < fRate; i++) {
      background(255);
      wakeUp();
      updateText();
    }
    update();
    updatingId = setInterval(update, dayTime * 1000);
    movingId = setInterval(main, 1000 / fRate);
    summarizing = false;
    flag3 = true;
    document.elementFromPoint(10, 10).click();
  });
}

function makeRestartButton() {
  button = createButton('Restart');
  button.position(canvasWidth - 90, canvasHeight / 30);
  button.style('margin', '0');
  button.style('transform', 'translate(-40%, 0%)');
  button.style('font-size', '12px');
  button.style('position', 'absolute');
  button.style('border', 'none');
  button.style('background', '#505050');
  button.style('color', '#ffffff');
  button.style('text-transform', 'uppercase');
  button.style('padding', '5px');
  button.style('border-radius', '6px');
  button.style('display', 'inline-block');
  button.style('transition', 'all 0.8s ease 0s');

  button.mouseOver(function() {
    button.style('cursor', 'pointer');
    button.style('color', '#404040');
    button.style('letter-spacing', '3px');
    button.style('display', 'inline-block');
    button.style('background', 'none');
    button.style('-webkit-box-shadow', '0px 5px 40px -10px rgba(0,0,0,0.57)');
    button.style('-moz-box-shadow', '0px 5px 40px -10px rgba(0,0,0,0.57)');
    button.style('transition', 'all 0.3s ease 0s');
  });

  button.mouseOut(function() {
    button.style('letter-spacing', '0');
    button.style('background', '#505050');
    button.style('color', '#ffffff');
    button.style('transition', 'all 0.3s ease 0s');
  });

  button.mousePressed(function() {
    var container = document.getElementById("chart-container");
    container.removeChild(container.childNodes[0]);
    container.removeChild(container.childNodes[1]);
    button.remove();
    setup();
    loop();
  });
}
// Transition from simulation to summary
function fadeIn() {
  background(255, 255, 255, 35);
  textSize(40);
  fill(0, 0, 0, 50);
  if (endResult)
    text('Summary', canvasWidth / 2 - 80, canvasHeight / 10);
  else
    text('Week ' + Math.ceil(currentDay / 7), canvasWidth / 2 - 70, canvasHeight / 10);
  textSize(14);
  if (endResult)
    text("-- Congratulations to the survivors! --", canvasWidth / 2 - 105, canvasHeight / 7 + 2);
  else
    text("--Click on each category (colored box) to hide/show chart lines--", canvasWidth / 2 - 200, canvasHeight / 7 + 2);
   text(" (Q): Period in Quarantine ", canvasWidth / 2 - 200, canvasHeight - 10);
  text(" (N): Period not in Quarantine ", canvasWidth / 2, canvasHeight - 10);
}

// Updating chart's labels and data points for every week
function updateDataHistory() {
  healthyHistory.push(healthy);
  infectedHistory.push(infected);
  recoveredHistory.push(recovered);
  deadHistory.push(dead);
  yLabels.push(quarantine ? currentDay + " (Q)" : currentDay + " (N)");
  fontColors.push(quarantine ? healthyColor : infectedColor);
  hospitalCapHistory.push(hospitalCapacity);
}

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
// End result
function result() {
  makeChart();
  makeSummary();
  setTimeout(makeRestartButton, 600);
  noLoop();
}

function makeSummary() {
  let infectedPer = (100 * maxInfected / populationSize).toFixed(2);
  let deadPer = (100 * dead / populationSize).toFixed(2);
  let recoveredPer = (100 * recovered / maxInfected).toFixed(2);
  textSize(26);
  fill(0, 0, 0);
  text("Statistics", canvasWidth - 210, canvasHeight / 4);
  textSize(13)
  text("Days elapsed: " + currentDay, canvasWidth - 211, canvasHeight / 4 + 40);
  text("Total Infections: " + maxInfected + " (" + infectedPer + "%)", canvasWidth - 211, canvasHeight / 4 + 70);
  text("Total Deaths: " + dead + " (" + deadPer + "%)", canvasWidth - 211, canvasHeight / 4 + 100);
  text("Total Recovered: " + recovered + " (" + recoveredPer + "%)", canvasWidth - 211, canvasHeight / 4 + 130);
}

function mouseClicked(e) {
  if (flag3 && inTriangle(e)) {
    changeState();
  }
}

function makeTriangle() {
  stroke(0);
  let e = {x: pmouseX, y: pmouseY};
  if (inTriangle(e) && flag3) {
    let temp;
    
    strokeWeight(0.5+k/5);
    if(quarantine)
      fill(quarantineColor());
    else
      fill(noquarantineColor());
    
    document.body.style.cursor = 'pointer';
    k = Math.min(6,k+1);
  }
  else{
    if(quarantine)
      fill(quarantineColor());
    else
      fill(noquarantineColor());
    strokeWeight(0.5-k/5);
    document.body.style.cursor = 'default';
    k = Math.max(0,k-1);
  }
  triangle(tx1, ty1 - k, tx2 + k/2, ty2, tx3-k/2, ty3);
}
function quarantineColor(){
  return 'rgba(20, '+(100+k*5).toString()+', 20, '+(0.65 + k*5).toString()+')'
}

function noquarantineColor(){
  return 'rgba('+(100+k*12).toString()+', 20, 20, '+(0.65 + k*5).toString()+')'
}

function inTriangle(m) {
  let x1 = canvasWidth / 2;
  let y1 = canvasHeight - 30 - k;
  let x2 = canvasWidth / 2 + 15 + k/2;
  let y2 = canvasHeight + 1 ;
  let x3 = canvasWidth / 2 - 15 - k/2;
  let y3 = canvasHeight + 1;
  let areaOrig = abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1));
  let area1 = abs((x1 - m.x) * (y2 - m.y) - (x2 - m.x) * (y1 - m.y));
  let area2 = abs((x2 - m.x) * (y3 - m.y) - (x3 - m.x) * (y2 - m.y));
  let area3 = abs((x3 - m.x) * (y1 - m.y) - (x1 - m.x) * (y3 - m.y));
  if (area1 + area2 + area3 == areaOrig) {
    return insideTriangle=true;
  }
  return insideTriangle=false;
}

function changeState() {
  if (!summarizing) {
    quarantine ^= 1;
  }
}


// ISOLATION OF INFECTED CASES

// ADD NEW INFECTIONS PER DAY

// ADD HOSPITAL CAPACITY

// ADD TACTILE FOR PHONE
