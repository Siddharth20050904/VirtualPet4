var dog,sadDog,happyDog;
var feedB, addB;
var database;
var foodStock=0;
var bg1, bg2, bg3;
var gameState = 1;
var currentTime;
var lastFed;


function preload(){
  sadDog=loadImage("dogImg.png");
  happyDog=loadImage("dogImg1.png");
  empty = loadImage("Milk.png");
  bg1 = loadImage("Bed Room.png");
  bg2 = loadImage("Garden.png");
  bg3 = loadImage("Wash Room.png");
  bg4 = loadImage("Living Room.png");
}

function setup() {
  createCanvas(500,500);
 
  database = firebase.database();
  
  food=new Food();
  food.getFoodStock();
  food.updateFoodStock(foodStock);
  
  dog=createSprite(250,300,20,20);
  dog.addImage(sadDog);
  dog.scale=0.2;

  feedB = createButton('Feed Dog');
  feedB.position(530,95);
  feedB.mousePressed(feedDog);

  addB = createButton('Add food');
  addB.position(610,95);
  addB.mousePressed(addFood);

  bathB = createButton('I want to Bath');
  bathB.position(507,125);
  bathB.mousePressed(()=>{
    gameState = 2;
    updateGameState(gameState);
  })

  sleepingB = createButton("I'm Sleepy");
  sleepingB.position(610,125);
  sleepingB.mousePressed(()=>{
    gameState = 3;
    updateGameState(gameState);
  })
 
  playingB = createButton("I want to Play");
  playingB.position(687,95);
  playingB.mousePressed(()=>{
    gameState = 4;
    updateGameState(gameState);
  })
 
  playInParkB = createButton("I want to Play in Park");
  playInParkB.position(385,95);
  playInParkB.mousePressed(()=>{
    gameState = 5;
    updateGameState(gameState);
  })
}

function draw() {
  background(46,139,87);
  fill("red");
  textSize(15);
  food.getFoodStock();
  food.display();
  if(gameState===0){
    dog.addImage(happyDog);
    dog.scale = 0.2;
  }else if(gameState===1){
    dog.addImage(sadDog);
    dog.scale = 0.2;
    dog.y = 300;
  }else if(gameState===2){
    dog.addImage(bg3);
    dog.scale = 1;
    dog.y = 150;
  }else if(gameState===3){
    dog.addImage(bg1);
    dog.scale = 0.999;
    dog.y = 150
  }else if(gameState===4){
    dog.addImage(bg4);
    dog.scale = 0.999;
    dog.y = 150;
  }else if(gameState===5){
    dog.addImage(bg2);
    dog.scale = 0.999;
    dog.y = 150;
  }
  readState();
  updateGameState(gameState);
  drawSprites();
}

function feedDog(){
  if(foodStock>0){
    foodStock -= 1
    food.updateFoodStock(foodStock);
    gameState = 0;
    updateGameState(gameState);
  }
}
function addFood(){
  foodStock = foodStock + 1;
  food.updateFoodStock(foodStock);
  //console.log("hello");
  gameState = 1;
  updateGameState(gameState);
}
function readState(){
  var gameStateRef = database.ref('gameState');
  gameStateRef.on("value", (data)=>{
  gameState = data.val();
})
}
function updateGameState(x){
  database.ref('/').update({
      'gameState' : x
  })
}