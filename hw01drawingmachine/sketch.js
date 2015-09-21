var r, g, b, x1, y1, x2, y2; 

function setup() {
  createCanvas(800, 600); 
  
  background(255, 192, 0);
  x1 = width/2;
  y1 = height/2;
  
  rectMode(CENTER); 
  
}

function draw() {
  r = random(128, 255);
  g = random(0, 192);
  b = 0;
  
  //if(mouseIsPressed){
    //distance from mouse
    var dx = (mouseX-x1)/10.;
    var dy = (mouseY-y1)/10.;
    
    var drunkx = 0.;
    drunkx += random(-10, 10);
    drunkx += random(-10, 10);
    drunkx += random(-10, 10);
    drunkx = drunkx / 3.;
    var drunky = 0.;
    drunky += random(-10, 10);
    drunky += random(-10, 10);
    drunky += random(-10, 10);
    drunky = drunky / 3.;
    
    //distance and drunkness to position
    x2 = x1+random(min(0, dx), max(0, dx))+drunkx;
    y2 = y1+random(min(0, dy), max(0, dy))+drunky;
    
    // draws line
    noFill(); 
    stroke(255, 255, 192, 100); 
    line(x1, y1, x2, y2); // x1, y1, x2, y2
    
    // draws circle
    var radius = random(5, 30);
    fill( map(mouseY, 0, height-1, 255, 0), map(mouseX, 0, width-1, 0, 255), b, 100); // set the fill to yellow
    ellipse(x2, y2, radius, radius); // draw a circle
    rect(x2, y1, random(0, radius), random(0, radius));
    
    // stash our new x and y for the next round
    x1 = x2;
    y1 = y2;
    
    //checks boundaries
    if(x1>width) x1 = 0;
    if(x1<0) x1 = width;
    if(y1>height) y1 = 0;
    if(y1<0) y1 = height;
  //}
}

function keyReleased()
{
  if(key==' ') background(r, g, 0);

}