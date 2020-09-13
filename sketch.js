var ground, invisibleGround;
var player, player_running;
var play=1;
var end=0;
var gameState=play;
var bg;



var score;
var bananaImage, backImage,stoneImage;

function preload(){
backImage = loadImage("jungle2.jpg");


  
 
  
player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
bananaImage = loadImage("Banana.png");
stoneImage = loadImage("stone.png");

}

function setup() {
  createCanvas(800,400);
 score=0;
  
  bg = createSprite(400,200,800,400);
  bg.addImage(backImage);
  bg.scale=1.5;
  bg.velocityX=-1;
  bg.x=bg.width/2;
  
  
  player = createSprite(100,340,20,50);
  player.addAnimation("running",player_running);
  player.scale = 0.1;
 
  
  
  ground=createSprite(200,385,2000,10);
  invisibleGround = createSprite(200,380,2000,10);
  invisibleGround.visible = false;
  //ground.addImage(backImage);
  
   ObstaclesGroup = new Group();
   BananaGroup = new Group();
}



function draw() {
  
  
  
   background(220);
  if(gameState === play){
    
    ground.velocityX = -(2 + 3*score/100);
    score = score+ Math.round(World.frameRate/30);
    if (score>0 && score%200 === 0){
     
      }
      if(keyDown("space")) {
    player.velocityY = -10;
    }
    player.velocityY = player.velocityY + 0.8
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(bg.x<0){
       bg.x=bg.width/2;
    }
    
  
    if(BananaGroup.isTouching(player)){
      BananaGroup.destroyEach();
      gameState = play;
    }
    if(ObstaclesGroup.isTouching(player)){
      ObstaclesGroup.destroyEach();
      gameState = end;
    }
    spawnBananas();
    spawnObstacles();
  
  }
  else if(gameState===end) {
    ground.velocityX = 0;
    bg.velocityX=0;
    player.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    BananaGroup.setVelocityXEach(0);
    
    ObstaclesGroup.setLifetimeEach(-1);
    BananaGroup.setLifetimeEach(-1);
  }
  
  
  player.collide(invisibleGround);
 
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+score,500,50);
}
function spawnBananas() {
 
  if (World.frameCount % 120 === 0) {
   
   
    var banana = createSprite(600,20,40,10);
    banana.y = Math.round(random(80,360));
    banana.addImage(bananaImage);
    banana.scale = 0.06;
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    
    banana.depth = player.depth;
    player.depth = player.depth + 1;
    
    
 

    
    BananaGroup.add(banana);
  }
}
  

function spawnObstacles() {
 
  if (World.frameCount % 200 === 0) {
    var stone = createSprite(500,500,40,10);
    stone.y = random(370,370);
    stone.addImage(stoneImage);
    stone.scale = 0.08;
    stone.velocityX = -3;
    
    BananaGroup.lifetime = 134;
    ObstaclesGroup.add(stone);
    
}
}



