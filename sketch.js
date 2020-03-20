var population = [];

//Sizes and Dimensions
var populationSize = 400;
var personSize = 10;
var canvasWidth = 750;
var canvasHeight = 500;
var offset = personSize / 2;
var countryScale = 1000;

// Time Tracking
var startTime;
var currentWeek = 1;
var dayTime = 8;
var nightTime = 2;
var night = false;

// Population Characteristics
var infected = 3;
var healthy = populationSize - infected;
var recovered = 0;
var dead = 0;
var mvFreq = 4;
var speed = 3;

// Virus Data
var recoveryRate = 0.9;
var deathRate = 0.1;
var complicationRate = 0.2;

// Initialization Function
function setup() {
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
  updateText();
  sleep();
}

//Moving and Interacting with other people
function wakeUp() {
  night = false;
  for (let p = 0; p < populationSize; p++) {
    population[p].move();
  }
}

//Stopping Movement
function sleep() {

  let currentTime = second();
  if ((startTime + dayTime) % 60 == currentTime) {
    startTime = currentTime;
    night = true;
    background(255);
    updateText();
    filter(INVERT);
    evolve()
    noLoop();
    setTimeout(function() {
      currentWeek++;
      loop();
    }, nightTime * 1000);
  }
}

function evolve() {
  night = false;
  for (let p = 0; p < populationSize; p++) {
    population[p].evolve();
    population[p].move();
  }
}

function updateText() {
  textSize(28);
  fill(0, 0, 0, 150);
  text('Week ' + currentWeek, 10, 30);
  textSize(15);
  text('Initial Population: ' + populationSize +',000', 10, 60);
  textSize(20);
  fill('rgba(20, 100, 20, 0.65)');
  text('Healthy: ' + healthy +',000', canvasWidth - 180, 30);
  fill('rgba(100, 20, 20, 0.65)');
  text('Infected: ' + infected +',000', canvasWidth - 180, 60);
  fill('rgba(20, 20, 100, 0.65)');
  text('Recovered: ' + recovered +',000', canvasWidth - 180, 90);
  fill('rgba(0, 0, 0, 0.65)');
  text('Dead: ' + dead +',000', canvasWidth - 180, 120);
}

//Creates a population
function createPopulation() {
  for (let i = 0; i < populationSize; i++) {
    let x = random(offset, canvasWidth - offset);
    let y = random(offset, canvasHeight - offset);
    let intersect = false;
    for (let j = 0; j < i; j++) {
      let other = population[j];
      if (dist(other.x, other.y, x, y) <= personSize + 5)
        intersect = true;
    }
    if (!intersect) {
      population.push(new person(x, y, i));
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
// ISOLATION OF INFECTED CASES
