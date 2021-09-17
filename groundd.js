class Ground3
{
  constructor(x, y, w,h) 
  {
    
    
    this.body = Bodies.rectangle(x, y, w, h);
    this.image = loadImage("ladder.png");
    this.w = w;
    this.h = h;
    World.add(world, this.body);
  }

  show() {
    let pos = this.body.position;
    push();
    rectMode(CENTER);
    noStroke();
    fill(148,127,146);
    image(this.image,pos.x,pos.y, this.w,this.h);
    pop();
  }
}
