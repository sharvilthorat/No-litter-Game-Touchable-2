var bgImg,specsImg,baket,basketImage,appleImg,bananaImg,melonImg,boxImg,bottleImg;
var WetWasteGroup,DryWasteGroup;
var PLAYSTATE=0;
var GAMESTATE=PLAYSTATE;
var ENDSTATE=1;
 var score=0;
 var overImg;



function preload(){
bgImg=loadImage("Images/Bg.jpg")
specsImg=loadImage("Images/Specs.png");
boxImg=loadImage("Images/Box.png");
bottleImg=loadImage("Images/Bottle.png");
appleImg=loadImage("Images/apple2.png");
bananaImg=loadImage("Images/banana2.png");
melonImg=loadImage("Images/melon2.png");
basketImage=loadImage("Images/trashCan.png");
overImg=loadImage("Images/GameOver.jpg");

}


function setup() {
  createCanvas(windowWidth,windowHeight);
  basket=createSprite(windowWidth/2, windowHeight-50, 50, 50);
  basket.addImage(basketImage);
WetWasteGroup= new Group();
DryWasteGroup= new Group();
 
}

function draw() {
  background(bgImg);  
if(GAMESTATE===PLAYSTATE){
  if(keyDown(LEFT_ARROW) || touches.lenght>0){
    basket.x=basket.x-5
    touches=[]
  }
  if(keyDown(RIGHT_ARROW) || touches.lenght<0){
    basket.x=basket.x+5
    touches=[]
  }


  spawnDryWaste();
  spawnWetWaste();

  for (var i = 0; i < DryWasteGroup.length; i++) {
    if (DryWasteGroup.get(i).isTouching(basket)) {
      DryWasteGroup.get(i).destroy();
        score =score+4;
        
    }

  }
  for (var i = 0; i < WetWasteGroup.length; i++) {
    if (WetWasteGroup.get(i).isTouching(basket)) {
      WetWasteGroup.get(i).destroy();
        score =score-2;
        
    }

  }
if(score<-1){
GAMESTATE=ENDSTATE

}

}

  else if(GAMESTATE===ENDSTATE){
    basket.destroy();
background(overImg)
  }
  drawSprites();
textSize(39);
  text("score="+score,100,100)
  
}

function spawnDryWaste() {
  if(frameCount % 300 === 0) {
    var DryWaste = createSprite(random(0,windowWidth),50,10,40);
    //obstacle.debug = true;
    DryWaste.velocityY=2;
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: DryWaste.addImage(specsImg);
              break;
      case 2: DryWaste.addImage(boxImg);
              break;
      case 3:  DryWaste.addImage(bottleImg);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    DryWaste.scale = 0.5;
   DryWaste.lifetime = 300;
    //add each obstacle to the group
    DryWasteGroup.add(DryWaste);
  }
}
function spawnWetWaste() {
  if(frameCount % 200 === 0) {
    var WetWaste = createSprite(random(0,windowWidth),50,10,40);
    //obstacle.debug = true;
    WetWaste.velocityY=2;
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: WetWaste.addImage(appleImg);
              break;
      case 2: WetWaste.addImage(bananaImg);
              break;
      case 3: WetWaste.addImage(melonImg);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
   WetWaste.scale = 1.5;
   WetWaste.lifetime = 300;
    //add each obstacle to the group
    WetWasteGroup.add(WetWaste);
  }
}
