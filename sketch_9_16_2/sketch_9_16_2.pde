Mover mover_unit;

void setup() {
  size(640, 360);
  mover_unit = new Mover();
}

void draw() {
  background(255);
  mover_unit.update();
  mover_unit.checkEdges();
  mover_unit.display();
}