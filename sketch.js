var population = [];

//Sizes and Dimensions
var populationSize = 500;
var personSize = 10;
var canvasWidth = 750;
var canvasHeight = 500;
var offset = personSize / 2;
var countryScale = 1000;
var fRate = 40;

// Time Tracking
var startTime;
var currentDay = 1;
var dayTime = 1;
var nightTime = 0;
var night = false;

// Population Characteristics
var infected = 5;
var healthy = populationSize - infected;
var recovered = 0;
var dead = 0;
var mvFreq = 2;
var speed = 2;
var summarizing = false;

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
  background(255);
  wakeUp();
  sleep();
  updateText();
  //summary()
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
  if ((startTime + dayTime) % 60 == currentTime) {
    startTime = currentTime;
    //night = true;
    //background(255);
    //updateText();
    //filter(INVERT);
    //evolve()
    //noLoop();
    setTimeout(function() {
      currentDay++;
      //loop();
    }, nightTime * 1000);
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
  fill('rgba(20, 100, 20, 0.7)');
  text('Healthy: ' + healthy, canvasWidth - 140, 30);
  fill('rgba(100, 20, 20, 0.7)');
  text('Infected: ' + infected, canvasWidth - 140, 60);
  fill('rgba(20, 20, 100, 0.7)');
  text('Recovered: ' + recovered, canvasWidth - 140, 90);
  fill('rgba(0, 0, 0, 0.7)');
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
  if (currentDay % 7 == 0) {
    background(255,255,255,25);
  }
}
  // ISOLATION OF INFECTED CASES