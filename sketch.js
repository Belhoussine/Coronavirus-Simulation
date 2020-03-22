var population = [];

//Sizes and Dimensions
var populationSize = 400;
var personSize = 10;
var canvasWidth = 750;
var canvasHeight = 500;
var offset = personSize / 2;
var countryScale = 1000;
var fRate = 40;

// Population Characteristics
var infected = 3;
var healthy = populationSize - infected;
var recovered = 0;
var dead = 0;
var mvFreq = 2;
var speed = 2;

// Time Tracking
var startTime;
var currentDay = 1;
var dayTime = 1;
var nightTime = 0;
var night = false;
var summaryFreq = 7;
var summarizing = false;

//Chart parameters
var healthyHistory = [healthy];
var infectedHistory = [infected];
var recoveredHistory = [recovered];
var deadHistory = [dead];
var yLabels = ["Day 1"]
var flag = true;

//Visual Characteristics
  healthyColor = 'rgba(20, 100, 20, 0.65)';
  infectedColor = 'rgba(100, 20, 20, 0.65)';
  recoveredColor = 'rgba(20, 20, 135, 0.7)';
  deadColor = 'rgba(0, 0, 0, 0.70)';
  hostpitalizedColor = 'rgba(20, 100, 100, 0.65)';

// Virus Data
var recoveryRate = 0.9;
var deathRate = 0.1;
var complicationRate = 0.3;


// Initialization Function
function setup() {
  frameRate(fRate);
  canvasWidth = windowWidth;
  canvasHeight = windowHeight;
  createCanvas(canvasWidth, canvasHeight);
  startTime = second();
  createPopulation();
  infectIndividuals();
}

// Loop Function
function draw() {
  if(!summarizing){
    flag = true;
    background(255);
    wakeUp();
    sleep();
    updateText();
  }
  summary()
  if(infected == 0)
    result();
}

//Moving and Interacting with other people
function wakeUp() {
  night = false;
  for (let p = 0; p < populationSize; p++) {
    population[p].move();
    population[p].evolve();
  }
}

//Stopping Movement
function sleep() {
  let currentTime = second();
  if (startTime == -1 || (startTime + dayTime) % 60 == currentTime ) {
    startTime = currentTime;
    currentDay++;
    updateDataHistory();
  }
}

function updateText() {
  noStroke();
  textSize(28);
  fill(0, 0, 0, 150);
  text('Day ' + currentDay, 10, 30);
  textSize(15);
  text('Initial Population: ' + populationSize, 10, 60);
  textSize(20);
  fill(healthyColor);
  text('Healthy: ' + healthy, canvasWidth - 140, 30);
  fill(infectedColor);
  text('Infected: ' + infected, canvasWidth - 140, 60);
  fill(recoveredColor);
  text('Recovered: ' + recovered, canvasWidth - 140, 90);
  fill(deadColor);
  text('Dead: ' + dead, canvasWidth - 140, 120);
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
      if (touching(tempPerson, existingPerson))
        intersect = true;
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
    fadeIn();
    startTime = -1;
    if(flag){
      flag = false;
      setTimeout(function(){
        noLoop();
        //updateDataHistory();
        makeChart();
        makeButton();
      },800);
    }
    
  }
}

function makeChart(){
 document.getElementById("chart-container").style.width = (canvasWidth* 0.9).toString()+"px";
 document.getElementById("chart-container").style.top = (canvasHeight /6).toString()+"px";
 var chartCanvas = document.createElement("CANVAS");
 chartCanvas.id='myChart';
 document.getElementById("chart-container").appendChild(chartCanvas)
 var ctx = document.getElementById('myChart').getContext('2d');
 var chart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: yLabels,
          datasets: [{
              label: "Healthy",
              backgroundColor: healthyColor,
              borderColor: healthyColor,
              data: healthyHistory,
          },{
              label: "Infected",
              backgroundColor: infectedColor,
              borderColor: infectedColor,
              data: infectedHistory,
            },{
              label: "Recovered",
              backgroundColor: recoveredColor,
              borderColor: recoveredColor,
              data: recoveredHistory,
            },{
              label: "Dead",
              backgroundColor: deadColor,
              borderColor: deadColor,
              data: deadHistory,
            }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
        }
      }
  });
}

function makeButton(){
  button = createButton('Continue');
  button.position(canvasWidth / 2, canvasHeight * 0.93);
  button.style('margin','0');
  button.style('transform','translate(-50%, 0%)');
  button.style('font-size', '12px');
  button.style('position','absolute');
  button.style('border', 'none');
  button.style('background','#404040');
  button.style('color', '#ffffff');
  button.style('text-transform', 'uppercase');
  button.style('padding','5px');
  button.style('border-radius', '6px');
  button.style('display','inline-block');
  button.style('transition', 'all 0.3s ease 0s');
  
  button.mouseOver(function(){
    button.style('color','#404040');
    button.style('letter-spacing','3px');
    button.style('display','inline-block');
    button.style('background','none');
    button.style('-webkit-box-shadow', '0px 5px 40px -10px rgba(0,0,0,0.57)');
    button.style('-moz-box-shadow', '0px 5px 40px -10px rgba(0,0,0,0.57)');
    button.style('transition', 'all 0.3s ease 0s');
  });
  
  button.mouseOut(function(){
    button.style('letter-spacing','0');
    button.style('background','#404040');
    button.style('color', '#ffffff');
    button.style('transition', 'all 0.3s ease 0s');
  });
  
  button.mousePressed(function(){ 
    var container = document.getElementById("chart-container");
    container.removeChild(container.childNodes[0]); 
    container.removeChild(container.childNodes[1]);
    button.remove();
    summarizing = false;
    wakeUp();
    loop();
  });
}
function fadeIn(){
  background(255,255,255,35);
  textSize(40);
  fill(0, 0, 0, 50);
  text('Week '+ currentDay / 7, canvasWidth / 2 - 70, canvasHeight / 10 );
  textSize(14);
  text("--Click on each category to hide/show chart lines--", canvasWidth / 3.3, canvasHeight / 7 );
}

// Updating chart's labels and data points for every week
function updateDataHistory(){
  yLabels.push("Day "+currentDay)
  healthyHistory.push(healthy);
  infectedHistory.push(infected);
  recoveredHistory.push(recovered);
  deadHistory.push(dead);
}

// End result
function result(){

}
  // ISOLATION OF INFECTED CASES