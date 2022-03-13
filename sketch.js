var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombieImg;
var bullet;
var zombiesGroup;
var bulletGroup;
var score =0;
var explosionSound, loseSound, winSound;
var gameState= "play";
var PLAY =1;
var END = 2;
var restart;
var restartImg;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  zombieImg = loadImage("assets/zombie.png");
  bgImg = loadImage("assets/bg.jpeg");
  restartImg = loadImage("assets/restart.png");

  explosionSound = loadSound("assets/explosion.mp3");
  loseSound = loadSound("assets/lose.mp3");
  winSound = loadSound("assets/win.mp3");

  zombiesGroup = new Group();
  bulletGroup = new Group();
  
 // explosionSound = loadSound("explosion.mp3");
 // loseSound = loadSound("lose.mp3");
 // winSound = loadSound("win.mp3");
}

function setup() {

  
  createCanvas(windowWidth,windowHeight); 

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.2
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)
     

   restart= createSprite(displayWidth/2,displayHeight/2+100,10,10)
   restart.addImage(restartImg);
   restart.scale=0.1;
  


}

function draw() {
  
  background(0); 
if(gameState === "play"){
 

  
 // restart.visible = false
  //moving the player up and down and making the game mobile compatible using touches
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
  player.y = player.y+30
  }


  //release bullets and change the image of shooter to shooting position when space is pressed
  if(keyWentDown("space")){
  
    player.addImage(shooter_shooting)
  
  }

  if(bulletGroup.isTouching(zombiesGroup)){
    explosionSound.play();
   handleZombie();
   bulletGroup.destroyEach();
  }

  
  //player goes back to original standing image once we stop pressing the space bar
  else if(keyWentUp("space")){
    player.addImage(shooterImg)
    bullet = createSprite(player.x,player.y,10,10)
    bullet.shapeColor = "lightblue"
    bullet.velocityX = 7;
    bulletGroup.add(bullet);

    
  }
 spawnZombie()
 
  drawSprites();
  fill("white")
 textSize(25)
 text("Score: "+score,displayWidth-150,30);

 if(zombiesGroup.isTouching(player)){
  gameState = "end";
 }
  
  if(score >= 100){
    win();
  }
}

 if(gameState === "end"){
   end();
  drawSprites()
 }
}


 
 function win(){
   background("black");
   bulletGroup.destroyEach();
   zombiesGroup.destroyEach();
   fill("yellow");
   strokeWeight(5);
   stroke("green");
   textSize(50);
   text("YOU WIN", displayWidth/2-100, displayHeight/2)
   winSound.play();
   
   
 }

 function end(){
   background("black");
   bulletGroup.destroyEach();
   zombiesGroup.destroyEach();
   fill("yellow");
   strokeWeight(5);
   stroke("green")
   textSize(40)
   text("Game Over", displayWidth/2-100, displayHeight/2)
    loseSound.play();
    restart.visible = true;
    player.visible = false;
    zombie.visible = false;
    background.visible = false;
    
 }
 
 function spawnZombie(){
   if(frameCount % 110 === 0){
     var zombie = createSprite(displayWidth-10,displayHeight/2+200.50,50)
     zombie.y = Math.round(random(displayHeight/2,displayHeight/2+300));
     zombie.addImage("walk",zombieImg);
     zombie.scale = 0.2;
     zombie.velocityX = -2;

     zombie.lifetime = 600;
     zombiesGroup.add(zombie)
   }
 }
 function handleZombie() {
 bulletGroup.overlap(zombiesGroup,function(collecter, collected){
  score += 10;
  collected.remove();
 })
 }

