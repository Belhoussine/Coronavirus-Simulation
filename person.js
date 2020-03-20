function person(x, y, id) {
  //ID and State
  this.id = id;
  this.infected = false;
  this.recovered = false;
  this.moving = false;
  this.dead = false;

  //Position and Movement
  this.x = x;
  this.y = y;
  this.speedx = Math.floor(random(-mvFreq, mvFreq)) / speed;
  this.speedy = Math.floor(random(-mvFreq, mvFreq)) / speed;

  //Visual Characteristics
  this.healthyColor = 'rgba(20, 100, 20, 0.65)';
  this.infectedColor = 'rgba(100, 20, 20, 0.65)';
  this.recoveredColor = 'rgba(20, 20, 100, 0.65)';
  this.invertH =  'rgba(235, 155, 235, 0.65)';
  this.invertI =  'rgba(155 , 235 , 235, 0.65)';
  this.invertR = 'rgba(235, 235, 155, 0.65)';
  this.size = personSize;

  //Setting Movement State (Moving or not)
  if (this.speedx == 0 && this.speedy) {
    this.moving = false;
  } else {
    this.moving = true;
  }

  // Moving the person if it has a moving state
  this.move = function() {
    if( ! this.dead){
      this.x += this.speedx;
      this.y += this.speedy;
      this.meetsPeople();
      this.hitsBorders();
      this.display();
    }
  }
  
    //Displaying the person
  this.display = function() {
    noStroke();
    if (this.infected){
      fill(this.infectedColor);
      if(night){
        fill(this.invertI);
      }
    }
    else if(this.recovered){
      fill(this.recoveredColor);
      if(night){
        fill(this.invertR);
      }
    }
    else{
      fill(this.healthyColor)
      if(night)
        fill(this.invertH);
    }
    circle(this.x, this.y, this.size);
  }

  //Border Collision
  this.hitsBorders = function() {
    //left and right
    if (this.x - (this.size / 2) < 0 || this.x + (this.size / 2) > canvasWidth) {
      this.speedx = -this.speedx;
      return true;
    }
    //top and bottom
    if (this.y - (this.size / 2) < 0 || this.y + (this.size / 2) > canvasHeight) {
      this.speedy = -this.speedy;
      return true;
    }
    return false;
  }

  //Meeting People
  this.meetsPeople = function() {
    for (let i = 0; i < populationSize; i++) {
      if (i == this.id) continue;
      let other = population[i];
      if (dist(other.x, other.y, this.x, this.y) <= personSize && other.infected && ! this.infected && ! this.recovered) {
        this.infected = true;
        infected++;
        healthy --;
      }
    }
    return false;
  }
  this.evolve = function(){
      this.speedx = Math.floor(random(-speed, speed)) / speed;
  this.speedy = Math.floor(random(-speed, speed)) / speed;
    if(! this.dead){
      if(this.infected && random(1) > recoveryRate * (1 - complicationRate) * 0.5){
        this.infected = false;
        this.recovered = true;
        recovered++;
        infected --;
      }
      else if(this.infected && random(1) < deathRate / (1-complicationRate)){
        this.infected = false;
        this.dead = true;
        dead++;
        infected --;
      }
    }
  }
}