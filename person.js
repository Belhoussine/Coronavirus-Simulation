function person(x, y, id) {
  //ID and State
  this.id = id;
  this.immunity = Math.random();
  this.infected = false;
  this.recovered = false;
  this.hospitalized = false;
  this.dead = false;
  this.moving = false;
  

  //Position and Movement
  this.x = x;
  this.y = y;
  this.speedx = (Math.floor(rand(-mvFreq, mvFreq+1)) / mvFreq) * speed;
  this.speedy = (Math.floor(rand(-mvFreq, mvFreq+1)) / mvFreq) * speed;

  //Visual Characteristics
  this.healthyColor = 'rgba(20, 100, 20, 0.65)';
  this.infectedColor = 'rgba(100, 20, 20, 0.65)';
  this.recoveredColor = 'rgba(20, 20, 135, 0.7)';
  this.deadColor = 'rgba(0, 0, 0, 0.70)';
  this.hostpitalizedColor = 'rgba(20, 100, 100, 0.65)';
  this.size = personSize;

  //Setting Movement State (Moving or not)
  if (this.speedx != 0 && this.speedy != 0) {
    this.moving = true;
  }
  
  // Moving the person if it has a moving state
  this.move = function() {
    if( !this.dead && this.moving){
      this.x += this.speedx;
      this.y += this.speedy;
      this.meetsPeople();
      this.hitsBorders();
    }
    this.display();
  }
  
    //Displaying the person
  this.display = function() {
    if(this.moving || this.dead)
      noStroke();
    else if(!this.moving)
      stroke(230,200,20);
    if (this.infected){
      fill(this.infectedColor);
    }
    else if(this.recovered){
      fill(this.recoveredColor);
    }
    else if (this.dead){
      fill(this.deadColor);
    }else if(this.hospitalized){
      fill(this.hospitalizedColor);
    }else{
      fill(this.healthyColor);
    }
    circle(this.x, this.y, this.size);
  }

  //Border Collision
  this.hitsBorders = function() {
    //left 
    if (this.x - (this.size / 2) <= 0 ) {
      this.speedx = Math.abs(this.speedx);
      return true;
    }
    //right
    if (this.x + (this.size / 2) >= canvasWidth) {
      this.speedx = -Math.abs(this.speedx);
      return true;
    }
    //top 
    if (this.y - (this.size / 2) <= 0 ) {
      this.speedy = Math.abs(this.speedy);
      return true;
    }
    //bottom
    if (this.y + (this.size / 2) >= canvasHeight) {
      this.speedy = -Math.abs(this.speedy);
      return true;
    }
    return false;
  }

  //Meeting People
  this.meetsPeople = function() {
    for (let i = 0; i < populationSize; i++) {
      if (i == this.id) continue;
      let other = population[i];
      if (this.gotInfected(other)) {
        this.infected = true;
        infected++;
        healthy --;
      }
    }
    return false;
  }
  this.evolve = function(){
    if (!this.dead ){
      if (this.infected){
        let randomnessFactor = Math.random() * fRate * dayTime;
        if(randomnessFactor <= 0.2){
          if(this.immunity < deathRate){
            this.die();
          }else if(this.immunity < complicationRate){
            this.getHospitalized();
          }else{
            this.recover();
          }
        }
      }
      if(!this.moving && Math.random() < 0.02)
        this.startMoving();
      else if(this.moving && Math.random() < 0.02)
        this.stopMoving();
    }
  }
  
  this.startMoving = function(){
    this.speedx = this.newSpeed();
    this.speedy = this.newSpeed();
    this.moving = true;
  }
  
  this.stopMoving = function(){
    this.speedx = 0;
    this.speedy = 0;
    this.moving = false;
  }
  this.die = function(){
    this.moving = false;
    this.infected = false;
    this.recovered = false;
    this.dead = true;
    infected--;
    dead++;
  }
  
  this.getHospitalized = function(){
    this.hospitalized = true;
    this.immunity/= 1.5;
  }
  
  this.recover = function(){
    recovered ++;
    infected --;
    this.recovered = true;
    this.infected = false;
    this.hospitalized = false;
  }
  
  this.gotInfected = function(other){
    if( ! this.moving ) console.log(touching(this, other))
    return touching(this, other) && other.infected && !this.infected && ! this.recovered;
  }
  
  this.quarantine = function(){
    
  }
  this.newSpeed = function(){
    return (Math.floor(rand(-mvFreq, mvFreq+1)) / mvFreq) * speed;
  }
}