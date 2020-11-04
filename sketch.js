var EarthBase, EarthImg ;
var Ship, ShipImg, Ship2Img;
var Ball, BallImg ; 
var object2, object2Img ; 
var object3, object3Img ;
var object1Group, object2Group, object3Group ;

var bullet, bulletGroup ;
var bullet1, bullet1Group;
var bullet2, bullet2Group;

var score = 0 ;
var gameState = "play" ;

function preload() {
  EarthImg = loadImage("Images/OwnGameEarth.png");
  
  ShipImg = loadImage("Images/OwnGameShip.png");

  Ship2Img = loadImage("Images/OwnGameShip2.png");

  BallImg = loadImage("Images/OwnGameBall.png");

  object2Img = loadImage("Images/OwnGameObject2.png");

  object3Img = loadImage("Images/OwnGameObject3.png");
}

function setup() {
  createCanvas(displayWidth - 200, displayHeight - 200);
  EarthBase = createSprite(600, 425, 50, 50);
  EarthBase.addImage("EarthImg", EarthImg);
  EarthBase.scale = 3 ;
  
  EarthBase.setCollider("rectangle", 0, 65, 300, 100);

 Ship = createSprite(400, 400, 50, 50);
 Ship.addImage("CannonImg",ShipImg);
 Ship.addImage("Cannon2Img",Ship2Img);
 Ship.scale = 0.7 ;

 object1Group = new Group();
 object2Group = new Group();
 object3Group = new Group();

 bulletGroup = new Group();
 bullet1Group = new Group();
 bullet2Group = new Group();
 
}

function draw() {
  background("Black");  

  if(gameState === "play") {
    Ship.x = mouseX ;
    spawnBall();
    spawnObject2();
    spawnObject3();

    if(keyDown("space")) {
      if(World.frameCount % 10 === 0) {
        createBullet();
      }
    }

    if(object1Group.isTouching(bulletGroup))  {
      object1Group.destroyEach();
      bulletGroup.destroyEach();
      score = score + 200; 
    }

    if(object1Group.isTouching(bullet1Group))  {
      object1Group.destroyEach();
      bullet1Group.destroyEach();
      score = score + 200; 
    }

    if(object1Group.isTouching(bullet2Group))  {
      object1Group.destroyEach();
      bullet2Group.destroyEach();
      score = score + 200; 
    }

    if(object2Group.isTouching(bulletGroup)) {
      object2Group.destroyEach();
      bulletGroup.destroyEach();
      score = score + 500;
    }

    if(object2Group.isTouching(bullet1Group)) {
      object2Group.destroyEach();
      bullet1Group.destroyEach();
      score = score + 500;
    }

    if(object2Group.isTouching(bullet2Group)) {
      object2Group.destroyEach();
      bullet2Group.destroyEach();
      score = score + 500;
    }

    if(object3Group.isTouching(bulletGroup)) {
      object3Group.destroyEach();
      bulletGroup.destroyEach();
      score = score + 1000;
    }

    if(object3Group.isTouching(bullet1Group)) {
      object3Group.destroyEach();
      bullet1Group.destroyEach();
      score = score + 1000;
    }

    if(object3Group.isTouching(bullet2Group)) {
      object3Group.destroyEach();
      bullet2Group.destroyEach();
      score = score + 1000;
    }

    if(object1Group.isTouching(EarthBase)) {
      object1Group.destroyEach();
      score = score - 200;
    }

    if(object2Group.isTouching(EarthBase)) {
      object2Group.destroyEach();
      score = score - 500;
    }

    if(object3Group.isTouching(EarthBase)) {
      object3Group.destroyEach();
      score = score - 1000;
    }

    if(score > 10000) {
      Ship.changeImage("Cannon2Img",Ship2Img);
    }

    if(score < 0) {
      gameState = "end";
    }
 
  }
  
if(gameState === "end") {
  object1Group.setVelocityYEach(0);
  object2Group.setVelocityYEach(0);
  object3Group.setVelocityYEach(0);
  bulletGroup.setVelocityYEach(0);
  bullet1Group.setVelocityYEach(0);
  bullet2Group.setVelocityYEach(0);
  Ship.x = 0;
  Ship.y = 0;

}


  drawSprites();

  textSize(35);
  fill("yellow");
  text("Score = " + score, 500, 50);
}

function spawnBall() {
  if(frameCount % 75 === 0) {
    Ball = createSprite(random(10, 790), 0, 50, 50);
    Ball.addImage("BallImg", BallImg);
    Ball.scale = 0.8 ;
    Ball.velocityY = 5 +  score/1000 ;
    object1Group.add(Ball);

  }
}

function spawnObject2() {
  if(frameCount % 100 === 0) {
    object2 = createSprite(random(10, 790), 0, 50, 50);
    object2.addImage("object2Img", object2Img);
    object2.scale = 0.3 ;
    object2.velocityY = 3 + score/1000;
    object2Group.add(object2);
  }
}

function spawnObject3() {
  if(frameCount % 125 === 0) {
    object3 = createSprite(random(10, 790), 0, 50, 50);
    object3.addImage("object3Img", object3Img);
    object3.scale = 0.5 ;
    object3.velocityY = 2 + score/1000;
    object3Group.add(object3);
  }
}

function createBullet() {
  bullet = createSprite(200, 200, 10, 20);
  bullet.velocityY = - (6 + score/10000);
  bullet.shapeColor = "red";
  bullet.x = Ship.x;
  bullet.y = Ship.y;  
  bulletGroup.add(bullet);

  bullet1 = createSprite(200, 200, 10, 20);
  bullet1.velocityY = - (6 + score/10000);
  bullet1.shapeColor = "red";
  bullet1.x = Ship.x - (50 + score/10000);
  bullet1.y = Ship.y;  
  bullet1Group.add(bullet1);

  bullet2 = createSprite(200, 200, 10, 20);
  bullet2.velocityY = - (6 + score/10000);
  bullet2.shapeColor = "red";
  bullet2.x = Ship.x + (50 + score/10000);
  bullet2.y = Ship.y;  
  bullet2Group.add(bullet2);
}


