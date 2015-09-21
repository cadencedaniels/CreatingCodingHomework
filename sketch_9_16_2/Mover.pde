
class Mover {
  PVector location; // PVector is a class, usually associated with a few pieces of data
  PVector velocity;
  PVector acceleration;
  float topspeed;
  
  Mover(){
    loaction = new PVector(width/2, height/2);
    velocity = new PVector(0, 0);
    acceleration = new PVector(-0.001, 0.01);
    topspeed = 10;
  }
  
  
  
  
}