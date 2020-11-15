//Create variables here

var dog, happyDog, database, foodS, foodStock;
var dogImage, dog2Image;
var milk, milkImg;
var fedPet, addFood;
var feedTime, lastFed;

function preload()
{
  //load images here
  dogImage = loadImage("images/dogimg.png");
  dog2Image = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  dog = createSprite(displayWidth/2,displayHeight/2,10,10);
  dog.addImage(dogImage);
  database = firebase.database();
  console.log(database);
  foodStock = database.ref('food');
  foodStock.on("value",readStock); 
  fedPet = createButton('Fed Pet');
  fedPet.position(100,100);
  fedPet.mousePressed(feedDog);
  addFood = createButton('Add Food');
  addFood.position(200,100);
  addFood.mousePressed(addFoods);
}


function draw() {  

  background(46, 139, 87);
  /*if(keyWentDown(UP_ARROW)){
    writeStock(foodS);*/
    
  //}
  feedTime = database.ref('fedTime')
  feedTime.on("value",(data)=>{
    lastFed = data.val();
  })
  food.display();
  drawSprites();
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed :"+ lastFed%12+"PM",350 ,50 );
  }
  else if(lastFed=0){
    text("Last Fed: 12AM",350,30);
  }
  else {
    text("Last Fed: " + lastFed,"AM",350,30);
  }


  //add styles here
}

function readStock(data){
  foodS= data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
    food:x
  })
}

function feedDog(){
  dog.addImage(dog2Image);
}

function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}