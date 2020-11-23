var PLAY=1;
var END=0
var gameState=PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score
var background,bckgImg
var invisibleground
var gameOver,gameOverImg
var score = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 bckgImg=loadImage("unnamed.png");
  gameOverImg = loadImage("gameOver.jpg")
}



function setup() {
  createCanvas(600,400);
  
bckg=createSprite(300,40,600,10)
  bckg.addImage("background",bckgImg);
 bckg.scale=2
monkey = createSprite(80,320,10,10);
  monkey.addAnimation("monkey",monkey_running)
  monkey.scale=0.25
  
  invisibleground=createSprite(300,390,600,10);
  invisibleground.visible=false

  obstacleGroup = createGroup();
  bananaGroup = createGroup();

}



function draw() {
  background("lightblue");
    

  if(gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
if(keyDown("space")&& monkey.y >= 150) {
        monkey.velocityY = -12;
} 
    monkey.velocityY=monkey.velocityY+0.8
  bckg.velocityX=-3
  
  if(bckg.x<90){
  bckg.x=bckg.width/2
  }
  spawnObstacles();
    spawnBanana();
    if(bananaGroup.isTouching(monkey)){
   bananaGroup.destroyEach()
    }
  monkey.collide(invisibleground)
    if(obstacleGroup.isTouching(monkey)){
    gameState = END
    }
  }
  if(gameState === END){
  monkey.velocityY = 0;
    bckg.velocityX=0;
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);    
    var gameOver = createSprite(300,200,10,10)
gameOver.addImage(gameOverImg)
    gameOver.scale=0.35
    
  }

 
  
  
  
  
  
  drawSprites();
  textSize(30);
text("survival time : "+score,300,50)
}
function spawnObstacles(){
if(frameCount % 300 === 0){
var obstacle = createSprite(550,360,10,10);
obstacle.addImage("stones",obstacleImage)
  obstacle.velocityX=-5
  obstacle.scale=0.2
  //obstacleGroup.collide(ground);
      obstacleGroup.add(obstacle);
     
}
 // obstacleGroup.add(obstacle);
}

function spawnBanana(){
   if (frameCount % 300 === 0) {
  banana = createSprite(600,100,20,50);
 
  banana.addImage( bananaImage);
 banana.y = Math.round(random(120,200));
     banana.scale=0.1;
      banana.velocityX = -3;
     banana.lifeTime=600/3;
      bananaGroup.add(banana);
   }
}





