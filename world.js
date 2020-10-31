var population = [];
var mobile;
var infectedMoroccans;

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
var peakInfection;
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
var daysOverCapacity;

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
var flag4;
var insideTriangle;
var started;
var endFlag;

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

async function setup() {
  // infectedMoroccans = await getDataset();
  // console.log(infectedMoroccans)
  background(255);
  population = [];
  insideTriangle = false;
  mobile = isMobile() && windowWidth < windowHeight;

  // Initializing Canvas parameters 
  canvasWidth = windowWidth;
  canvasHeight = windowHeight;

  // Initializing text Parameters
  tx1 = canvasWidth / 2;
  ty1 = canvasHeight - 30;
  tx2 = canvasWidth / 2 + 15;
  ty2 = canvasHeight + 1;
  tx3 = canvasWidth / 2 - 15;
  ty3 = canvasHeight + 1;
  k = 0;

  // Initializing Population Parameters
  populationSize = Math.floor(Math.max(canvasWidth, canvasHeight) / 200) * 100;
  populationSize = mobile ? Math.min(400, populationSize) : populationSize;
  personSize = 10 + mobile * 10;
  offset = personSize / 2;
  infected = 3 + 4 * mobile;
  maxInfected = infected;
  peakInfection = 0;
  healthy = populationSize - infected;
  recovered = 0;
  dead = 0;
  mvFreq = 100;
  speed = 1.5 + mobile * 1.5;
  quarantine = mobile;
  quarantineStop = 0.025;
  quarantineMov = 0.012;
  normalStop = 0.01;
  normalMov = 0.020;
  hospitalCapacity = Math.floor(populationSize / 3);


  // Initializing time parameters
  currentDay = 1;
  dayTime = 1.1;
  summaryFreq = 14;
  summarizing = false;
  endResult = false;
  daysOverCapacity = 0;
  let firstDay = "1 " + (quarantine ? "(Q)" : "(N)")


  // Keeping track of history to draw chart
  healthyHistory = [healthy];
  infectedHistory = [infected];
  recoveredHistory = [recovered];
  deadHistory = [dead];
  hospitalCapHistory = [hospitalCapacity];
  yLabels = [firstDay];
  fontColors = [quarantine ? healthyColor : infectedColor];
  flag = true;
  flag2 = true;
  flag3 = true;
  endFlag = true;
  started = false;

  // Initializing rates
  recoveryRate = 0.9;
  deathRate = 0.05;
  complicationRate = 0.1;


  frameRate(fRate);
  createCanvas(canvasWidth, canvasHeight);
  background(255);
  welcomePage();
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
  if (healthy > 5)
    summary();
  else if (endFlag) {
    speed *= (2 + mobile);
    endFlag = false;
  }
}

// Updating data each day
function update() {
  if (infected > hospitalCapacity) {
    daysOverCapacity++;
    peakInfection = Math.max(peakInfection, infected);
  }
  currentDay++;
  updateDataHistory();
}

// Loop Function
function draw() {
  if (started) {
    createPopulation();
    infectIndividuals();
    updatingId = setInterval(update, dayTime * 1000);
    movingId = setInterval(main, 1000 / fRate);
    started = false;
  }
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


// End result
function result() {
  makeChart();
  makeSummary();
  setTimeout(makeRestartButton, 600);
  noLoop();
}

function windowResized() {
  canvasWidth = windowWidth;
  canvasHeight = windowHeight;
  resizeCanvas(windowWidth, windowHeight);
}

// ISOLATION OF INFECTED CASES
