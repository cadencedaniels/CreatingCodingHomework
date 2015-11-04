// SPIROGRAPH
// http://en.wikipedia.org/wiki/Spirograph
// also (for inspiration):
// http://ensign.editme.com/t43dances
//
// this p5 sketch uses simple transformations to create a
// Spirograph-like effect with interlocking circles (called sines).  
// press the spacebar to switch between tracing and
// showing the underlying geometry.
//
// your tasks:
// (1) tweak the code to change the simulation so that it draws something you like.
// hint: you can change the underlying system, the way it gets traced when you hit the space bar,
// or both.  try to change *both*.  :)
// (2) use p5.sound or tone.js to make the simulation MAKE SOUND.
// hint: the websites for p5.sound and tone.js have lots of examples.
// try and adapt them.
// another hint: javascript isn't super efficient with a large number of audio playing at once.
// see if there's a simple way to get an effective sound, or limit the number of shapes
// you're working with.

var x = 0;
var y = 0;
var NUMSINES = 20; // how many of these things can we do at once?
var sines = new Array(NUMSINES); // an array to hold all the current angles
var rad; // an initial radius value for the central sine
var i; // a counter variable
var oscs = new Array(NUMSINES); // these will make sound

// play with these to get a sense of what's going on:
var fund = 0.0003; // the speed of the central sine
var ratio = .5; // what multiplier for speed is each additional sine?
var alpha = 90; // how opaque is the tracing system


var trace = true; // are we tracing?

var pitches = [40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78];

function setup()
{
  createCanvas(800, 800); // OpenGL mode

  rad = height/4; // compute radius for central circle
  background(50); // clear the screen

  for (i = 0; i<sines.length; i++)
  {
    sines[i] = PI; // start EVERYBODY facing NORTH
    oscs[i] = new p5.Oscillator(); // this initializes the oscillators
    oscs[i].setType('sine');
    //oscs[i].freq(200*(i+1));
    oscs[i].freq(map(x, 0, pitches[i], 100, 1000));
    oscs[i].amp(map(y, 0, pitches[i], 1, 0));
    oscs[i].start();
  }
}

function draw()
{
  if (!trace) {
    background(50); // clear screen if showing geometry
    stroke(200, 200, 250*(float(i)/sines.length), alpha); 
    noFill(); // don't fill
  } 

  // MAIN ACTION
  push(); // start a transformation matrix
  translate(width/2, height/2); // move to middle of screen

  for (i = 0; i<sines.length; i++) // go through all the sines
  {
    var erad = 0; // radius for small "point" within circle... this is the 'pen' when tracing
    // setup for tracing
    if (trace) {
      stroke(200, 200, 200*(float(i)/sines.length), alpha);
      fill(200, 200, 200, alpha/2);
      erad = 6.0*(1.0-float(i)/sines.length); // pen width will be related to which sine
    }
    var radius = rad/(i+1); // radius for circle itself
    rotate(sines[i]); // rotate circle
    if (!trace) ellipse(x, y, radius*6, radius*2); // if we're simulating, draw the sine
    push(); // go up one level
    translate(0, radius+20); // move to sine edge
    if (!trace) ellipse(x, y, 10, 5); // draw a little circle
    if (trace) ellipse(x, y, erad, erad/8); // draw with erad if tracing
    pop(); // go down one level
    translate(0, radius/3); // move into position for next sine
    sines[i] = (sines[i]+(fund+(fund*i*ratio)))%TWO_PI; // update angle based on fundamental
  }
  
  pop(); // pop down final transformation
  
}

function keyReleased()
{
  if (key==' ') {
    trace = !trace; 
    background(50);
  }
}

