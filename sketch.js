var ufo, space, ufoImg,spaceImg;

var bgSound, deathSound;

var gameState = "instructions";

var gunsGroup, lasersGroup, enemyGroup;
    
var gunImg, enemyImg, laserImg;

var score ;

var invisible;

var deadSound;



function preload(){
  
  ufoImg = loadImage("UFO.png");
  
  spaceImg = loadImage("space.jpg");
  
  bgSound = loadSound("bensound-summer.mp3");
  
  deathSound = loadSound("checkPoint.mp3");
  
  gunImg = loadImage("Gun.png");
  
  enemyImg = loadImage("enemy.png");
  
  laserImg = loadImage("bullet.png");
  
  deadSound = loadSound("die.mp3");
  
  
}



function setup() {
  createCanvas(600, 550);
  
  bgSound.loop();
  
  
  space = createSprite(300,300);
  space.addImage(spaceImg);
  
  ufo = createSprite(50,300);
  ufo.addImage(ufoImg);
  //ufo.debug = true;
  ufo.setCollider("rectangle",0,0,ufo.width-20,ufo.height-300);
  ufo.scale = 0.2;
  
  
  
  lasersGroup = new Group();
  
  enemyGroup = new Group();
  
  gunsGroup = new Group();
  
  score = 0;
  
  
  
  
}

function draw() {
  
 
  
  if (gameState === "instructions"){
    
    
    background(0);
    
    fill("lightgreen");
    textSize(30);
    textFont("Georgia")
    text("'You Have Esacaped From Earth!'",75,130);
    stroke("yellow");
    fill("white");
    textSize(20);
    text("Use 'Arrow Keys' To move Up and Down",120,200);
    text("Shoot The Incoming Enemies By Pressing 'SPACE'", 70,240);
    text("If The Enemies Touch YOU,",170,280);
    textSize(25);
    text("YOU LOSE!", 225, 320);
    textSize(18);
    text("Press 'SPACE' To Start", 205,400);
    
    
    
    
    
    
  }
  
  if (keyDown("space")&&gameState === "instructions"){
    
    gameState = "play";
    
  }
   
  if(gameState === "play"){
    
    space.velocityX = -2;
  
    if (space.x === 100){
      
      space.x = space.width/2
      
    }
    
    
    
    
    spawnGuns();
    spawnEnemy();
    
    
    
    
    space.velocityX = -2;
    
    
    
  
    
    if(keyDown("down")){
      ufo.y = ufo.y + 6;
      
    }
    
    
    if(keyDown("up")){
      ufo.y = ufo.y - 6;
      
    }
    
    if(keyWentDown("SPACE")){
      
      spawnLaser();
    }
    
    if(lasersGroup.isTouching(enemyGroup)){
      
      score = score+1;
      
      enemyGroup.destroyEach();
      lasersGroup.destroyEach();
      deathSound.play();
      
    }
    
    if(lasersGroup.isTouching(gunsGroup)){
      
      score = score+2;
      
      gunsGroup.destroyEach();
      lasersGroup.destroyEach();
      deathSound.play();
    } 
    
    
    
    if (enemyGroup.isTouching(ufo) || gunsGroup.isTouching(ufo)){
      
      gameState = "end";
      deadSound.play();
      
    }
    
    
  drawSprites();
    
    stroke("white");
    fill("white");
    textSize(20);
    text("SCORE:"+score,250,60);
    
}
  
  
  
if(gameState === "end"){
  
    
  
    stroke("black");
    fill("white");
    textSize(40);
    text("GAME OVER!",170,275);
    textSize(30);
    text("Press 'R' To Restart",165, 325);
  
  
    
    enemyGroup.setVelocityXEach(0);
    lasersGroup.setVelocityXEach(0);
    gunsGroup.setVelocityXEach(0);
    
    enemyGroup.setLifetimeEach(-1);
    lasersGroup.setLifetimeEach(-1);
    gunsGroup.setLifetimeEach(-1);
  
  
    if(keyDown("r") && gameState === "end"){
      
      restart();
      
    }
  
}  
  
  
}  

function spawnLaser(){
  
  var laser = createSprite(40,300);
  laser.addImage(laserImg);
  laser.scale = 0.5
  //laser.debug = true;
  laser.setCollider("rectangle",0,0,laser.width-50,laser.height-50)
  laser.velocityX = 8;
  laser.y = ufo.y
  lasersGroup.add(laser);
  return laser;
  
}

function spawnEnemy(){
  
  if(frameCount%100 ===0){
    
    var enemy = createSprite(630,300);
    enemy.addImage(enemyImg);
    enemy.scale = 0.2;
    //enemy.debug = true;
    enemy.setCollider("rectangle",0,0,enemy.width-80,enemy.height-                         300);
    enemy.velocityX = -8;
    enemy.lifetime = 300;
    enemy.y = Math.round(random(100,500));
    
    enemyGroup.add(enemy);
    
    
    
  }
  
}

function spawnGuns(){
  
  if(frameCount%170 ===0){
    
    var gun  = createSprite(630,300);
    gun.addImage(gunImg);
    //gun.debug = true;
    gun.setCollider("rectangle",0,0,gun.width-80,gun.height-200);
    gun.scale = 0.1;
    gun.velocityX = -7;
    gun.lifetime = 300;
    gun.y = Math.round(random(100,500));
    
    gunsGroup.add(gun);
    
    
    
  }
  
}

function restart(){
  
  gameState = "play";
  
  gunsGroup.destroyEach();
  enemyGroup.destroyEach();
  lasersGroup.destroyEach();
  
  ufo.y = 300;
  
  
  score = 0;
}



