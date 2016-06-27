const Cloud = require("./cloud");
const Pokemon = require("./pokemon");
const Pokeball = require("./pokeball");
const Building = require("./building");
const Balloon = require("./balloon");
const Menu = require("./menu");

 class Game {
   constructor () {
     this.pokeballs = [];
     this.buildings = [];
     this.balloons = [];
     this.pokemon;

     this.canvas = document.getElementById("background");
     this.context = this.canvas.getContext("2d");
     this.gameOver = true;

     this.instantiateMusic();

     this.startScreen();
     this.generateClouds();
   }

   instantiateMusic () {
     this.introMusic = new Audio("./music/intro.mp3");
     this.mainMusic = new Audio("./music/main.mp3");
     this.endMusic = new Audio("./music/end.mp3");
     this.collide = new Audio("./music/rip.wav");

     this.songs = [this.introMusic, this.mainMusic, this.endMusic];
   }

   backToBeginning (audioFile) {
     audioFile.addEventListener("ended", f=> {
       audioFile.currentTime = 0;
       audioFile.play();
     }, false);
   }

   startScreen () {
     this.fn = this.startGame.bind(this);
     document.addEventListener("keyup",this.fn, false);
     this.menu = new Menu(false, 0, this, this.songs);
     window.setInterval(this.generateClouds.bind(this), 5000);
     this.introMusic.play();
     this.backToBeginning(this.introMusic);
   }

   startGame (e) {
     if (e.keyCode === 13 && this.gameOver) {
       this.introMusic.pause();
       this.endMusic.pause();

       this.context.clearRect(0, 0, 800, 1000);
       document.removeEventListener("keyup", this.fn, false);
       this.gameOver = false;

       this.pokeballs = [];
       this.buildings = [];
       this.balloons = [];

       const startingPosition = {x: 80, y: 290};
       this.pokemon = new Pokemon(startingPosition, this);

       this.menu.started = true;
       this.menu.currentScore = 0;
       this.menu.startScoring();

       this.addMoreObstacles();

       this.addBall = window.setInterval(this.addPokeBalls.bind(this), 4567);
       this.addBuilding = window.setInterval(this.addMoreObstacles.bind(this), 5000);
       this.mainMusic.volume = 0.2;
       this.mainMusic.play();
       this.backToBeginning(this.mainMusic);
     }
   }

   over () {
     this.checkCollision(this.pokeballs, "pokeball");
     this.checkCollision(this.buildings, "building");
     this.checkCollision(this.balloons, "balloon");
     return this.gameOver;
   }

   checkCollision (array, type) {
     array.forEach( item =>{
       if ( item.position.x <= -500) {
         array.splice(array.indexOf(item), 1);
       } else {
         if ( this.isBetween(type, item.position.x, item.position.y, item) ||
           this.pokemon.position.y <  -100 ||
           this.pokemon.position.y > 1200
         )
         {
           this.gameOver = true;
         }
       }
     })
   }

   isBetween (type, itemX, itemY, item) {
     let width;
     let height;
     let hitPokemon = false;

     if (type === "pokeball"){
       hitPokemon = this.checkPokeBalls(itemX, itemY);
     } else if (type === "building"){
       hitPokemon = this.checkBuildings(itemX, itemY);
     } else if (type === "balloon"){
       hitPokemon = this.checkBalloons(itemX, itemY);
     }

     if (hitPokemon){
       return true;
     }
     else if ( type === "building" && this.pokemon.position.x >= itemX + 400) {
      this.buildings.splice(this.buildings.indexOf(item), 1);
      this.menu.currentScore += 1;
      this.menu.startScoring();
      return false;
    }

   }

   checkBalloons (xPos, yPos) {
     if (
       this.checkHitBoxes(xPos, yPos - 172, 323, 233) ||
       this.checkHitBoxes(xPos + 90, yPos+ 55, 121, 167)
     ){
       return true;
     }
     return false;
   }

   checkBuildings (xPos, yPos) {
     if (
       this.checkHitBoxes(xPos + 15, yPos + 130 , 377, 274) ||
       this.checkHitBoxes(xPos + 30, yPos + 70, 251, 61) ||
       this.checkHitBoxes(xPos + 100, yPos + 20, 50, 50)
     ){
       return true;
     }
   }

   checkPokeBalls (xPos, yPos) {
     if (this.checkHitBoxes(xPos, yPos, 22, 22)){
       return true;
     }
     return false;
   }

   checkHitBoxes (itemX, itemY, width, height) {
     if (
       !( this.pokemon.position.x > itemX + width ||
       this.pokemon.position.x + this.pokemon.width < itemX ||
       this.pokemon.position.y > itemY + height ||
       this.pokemon.position.y + this.pokemon.height < itemY )
     )
     {
       return true;
     }
   }

   overScreen () {
     this.collide.play();
     this.menu.gameIsOverBuddy();
     this.mainMusic.pause();
     window.clearInterval(this.addBall);
     window.clearInterval(this.addBuilding);
     window.addEventListener("keyup", this.fn, false);

     this.endMusic.volume = 0.2;
     this.endMusic.play();
     this.backToBeginning(this.endMusic);
   }

   randomY () {
     return 550 * Math.random();
   }

   chooseRandomY () {
     const randomIndex = [0,1,2,3];
     return randomIndex[Math.floor(Math.random() * randomIndex.length)];
   }

   generateClouds () {
     const position = { x: 800, y: this.randomY() };
     new Cloud(position, this);
   }

   addPokeBalls () {
     const position = { x: 800, y: this.randomY() };
     this.pokeballs.push( new Pokeball(position, this) );
   }

   addMoreObstacles () {
     const balloonYs = [0, -50, -100, -150];
     const buildingYs = [600, 550, 500, 450];
     const randomIndex = this.chooseRandomY();
     const balloonPosition = { x: 800, y: balloonYs[randomIndex] };
     const buildingPosition = { x: 800, y: buildingYs[randomIndex] };
     this.balloons.push(new Balloon(balloonPosition, this));
     this.buildings.push(new Building(buildingPosition, this));
   }

 }


 module.exports = Game;
