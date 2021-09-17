
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var stones=[];
var bg_img;
var ground,ground2;
var rope;
var rope2;
var fruit_con;
var fruit_con_2;
var fruit_con_3;

var air;
var build;
var vilImg;
var vildown;
var villain;
var villaindown;
var superman;
var supermangif;
var ground3;
var rope3;
var button2;
var health;
var endshot;
var endImg;
var hpImg;
var health;
var health2;
var health3;
var btn2;
var btn3;
var police;
var pol;
var siren;
var sirenImg;
var victory;
var win;
var dhealth;
var dhealth2;
var dhealth3;
var dhealthImg;

function preload(){
  bg_img = loadImage('MGDgYI.jpg');
  vilImg=loadImage("villainup.png");
  vildown=loadImage("villaindown.png");
  supermangif=loadImage("superman-arc_superman_idle-air.gif");
  endImg=loadImage("end.png");
  hpImg=loadImage("greenblock.png");
  pol=loadImage("policecar.png");
  sirenImg=loadAnimation("bluelight.png","redlight.png");
  win=loadImage("you win.jpg")
  dhealthImg=loadImage("redblock.png")
}

function setup() {
  var mobile=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if(mobile){
    createCanvas(displayWidth,displayHeight);
  } 
  else{
    createCanvas(windowWidth,windowHeight);
  
  }
  engine = Engine.create();
  world = engine.world;
  
  rope = new Rope(10,{x:width-800,y:0});
  rope2 = new Rope(7,{x:width-400,y:0});
  rope3 = new Rope(7,{x:width-150,y:0});

  police= createSprite(width-600,height-90,50,50);
  police.scale=0.2;
  police.addImage(pol);
  police.visible=false;
  siren= createSprite(width-600,height-180,50,50);
  siren.scale=0.1;
  siren.addAnimation("s",sirenImg);
  siren.visible=false;
  ground = new Ground(width-600,height-450,width/4.5,20);
  ground3 = new Ground3(width-80,height-450,width/35,300);
  ground2 = new Ground2(0,height-50,width,100);
  fruit_con = new Link(rope,ground.body);
  fruit_con_2 = new Link(rope2,ground.body);
  fruit_con_3 = new Link(rope3,ground3.body);

  build = new Tower(width-1150,height-310,width/3,700);

  villain = createSprite(width-350,height-90,20,50);
  villain.scale=0.2;
  villain.addImage("v",vilImg);
  
  villaindown = createSprite(width-350,height-90,20,50);
  villaindown.scale=0.2
  villaindown.addImage(vildown);
  villaindown.visible=false;

  superman = createSprite(width-1020,height-570,20,50);
  superman.scale=2;
  superman.addImage(supermangif);

  

  endshot= createSprite(superman.x,superman.y,50,20);
  endshot.visible=false;
  endshot.addImage(endImg);

  button = createImg('button.png');
  button.position(width-180,height-600);
  button.size(50,50);
  button.mouseClicked(drop3);

  btn2 = createImg('lever.png');
  btn2.position(superman.x+10000,superman.y-50);
  btn2.size(50,50);
  btn2.mouseClicked(drop);
  


  button2 = createImg('fan.png');
  button2.position(width-150,height-140);
  button2.size(80,120);
   button2.mouseClicked(blow);

   health=createSprite(width-290,height-250,70,30);
   health2=createSprite(width-370,height-250,70,30);
   health3=createSprite(width-450,height-250,70,30);
   health.scale=0.1;
   health2.scale=0.1;
   health3.scale=0.1;
   health.addImage(hpImg);
   health2.addImage(hpImg);
   health3.addImage(hpImg);

   dhealth=createSprite(width-290,height-250,70,30);
   dhealth2=createSprite(width-370,height-250,70,30);
   dhealth3=createSprite(width-450,height-250,70,30);
   dhealth.scale=0.1;
   dhealth2.scale=0.1;
   dhealth3.scale=0.1;
   dhealth.addImage(dhealthImg);
   dhealth2.addImage(dhealthImg);
   dhealth3.addImage(dhealthImg);
   dhealth.visible=false
   dhealth2.visible=false
   dhealth3.visible=false



   victory=createSprite(width/2,height/2-50,50,50);
   victory.addImage(win);
   victory.scale=0.5;
   victory.visible=false
}


function draw() 
{
 
  background(51);
  image(bg_img,0,0,width,height);
  Engine.update(engine);
  fill("Black")
  textSize(30);
  text("Villain", width/2+260, height/2+60);

  for(var stone of stones){
    stone.display();
    var pos=stone.body.position;
    var distance= dist(villain.position.x,villain.position.y,pos.x,pos.y);
    if(distance<=100){
      villain.velocityX=0;
      Matter.Body.setVelocity(stone.body,{x:10,y:-10});
      health2.visible=false;
      dhealth2.visible=true
      collided= true;
    }
  }

  if(endshot.isTouching(villain)){
    health.visible=false
    dhealth.visible=true
    villain.visible=false
    villaindown.visible=true
    police.visible=true; 
    siren.visible=true; 
    victory.visible=true;
   }
  if(collide(ground3.body,villain,200)==true)
  {
    //World.remove(engine.world,ground);
    //ground=null;
    villain.x=villain.x-6
    health3.visible=false
    dhealth3.visible=true
    btn2.position(superman.x+50,superman.y-50);

  }
  if(collide(build.body,btn2,200)==true)
  {
    //World.remove(engine.world,ground);
    //ground=null;
    //drop();
    drop2();
  }
  
  ground.show();
  ground2.show();
  ground3.show();
  rope.show();
  rope2.show();
  rope3.show();
  build.show();

  drawSprites();
  showStones();
}

function showStones(){
  if(stones.length>0){
    if(stones.length<4 && stones[stones.length-1].body.position.x<width-200){
    var pos=[-90,-120,-100,-80];
    var ypos=random(pos)
    var stone= new Stone(width-500,height-800,40,ypos)
    stones.push(stone);
      }
      for(var i=0;i<stones.length;i++){
        stones[i].display();
      }
  }
  else{
    var stone= new Stone(width-500,height-800,40,-80)
    stones.push(stone);
  }
}
function keyPressed(){
if (keyCode === 32) {
  laser.velocityX=20;
  laser.velocityY=8;
  laser.visible=true;
  
  

   }
}
function keyReleased(){
  if (keyCode === 32) {
    endshot.velocityX=20;
        endshot.velocityY=18;

    endshot.visible=true;
  
     }
  }
function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}

function drop()
{
  //cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function drop2()
{
  //cut_sound.play();
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2 = null;
}
function drop3()
{
  //cut_sound.play();
  rope3.break();
  fruit_con_3.detach();
  fruit_con_3 = null;
}
function blow(){
  Matter.Body.applyForce(ground3.body,{x:0,y:0},{x:-0.8,y:0});
}