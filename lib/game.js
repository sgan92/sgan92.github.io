const Cloud = require("./cloud");
const Pokemon = require("./pokemon");
const Pokeball = require("./pokeball");
const Building = require("./building");
const Balloon = require("./balloon");
const Menu = require("./menu");

const Game = function(){
  this.pokeballs = [];
  this.buildings = [];
  this.balloons = [];
  this.pokemon;

  this.canvas = document.getElementById("background");
  this.context = this.canvas.getContext("2d");
  this.gameOver = false;

  this.startScreen();
  this.generateClouds();

  this.fn = this.startGame.bind(this);
  document.addEventListener("keyup",this.fn, false);

}

Game.prototype = {
  startScreen: function(){
    this.menu = new Menu(false, 0);
    window.setInterval(this.generateClouds.bind(this), 5000);
  },

  startGame: function(e){
    if (e.keyCode === 13) {
      this.gameOver = false;
      this.context.clearRect(0, 0, 800, 1000);

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
      this.addBuilding = window.setInterval(this.addMoreObstacles.bind(this), 6000);
      document.removeEventListener("keyup", this.fn);
    }
  },

  over: function(){
    this.checkCollision(this.pokeballs, "pokeball");
    this.checkCollision(this.buildings, "building");
    this.checkCollision(this.balloons, "balloon");
    return this.gameOver;
  },

  checkCollision: function(array, type){
    array.forEach( function(item){
      if ( item.position.x <= -500) {
        array.splice(array.indexOf(item), 1);
      } else {
        if ( this.isBetween(type, item.position.x, item.position.y, item) ||
          this.pokemon.position.y < - 100 ||
          this.pokemon.position.y > 1200
        )
        {
          this.gameOver = true;
        }
      }
    }.bind(this));
  },

  isBetween: function(type, itemX, itemY, item){
    let width;
    let height;

    if (type === "pokeball"){
      width = 22;
      height = 22;
    } else if (type === "building"){
      width = 395;
      height = 270;
    } else if (type === "balloon"){
      width = 340;
      height = 180;
    }

    if (
      !( this.pokemon.position.x > itemX + width ||
      this.pokemon.position.x + this.pokemon.width < itemX ||
      this.pokemon.position.y > itemY + height ||
      this.pokemon.position.y + this.pokemon.height < itemY )
    )
    {
     return true;
   } else if ( type === "building" && this.pokemon.position.x >= itemX + width) {
     this.buildings.splice(this.buildings.indexOf(item), 1);
     this.menu.currentScore += 1 ;
     this.menu.startScoring();
     return false;

   }

  },

  overScreen: function(){
    this.menu.gameIsOverBuddy();
    window.clearInterval(this.addBall);
    window.clearInterval(this.addBuilding);
    window.addEventListener("keyup", this.fn, false);
  },

  randomY: function(){
    return 550 * Math.random();
  },

  generateClouds: function(){
    const position = { x: 800, y: this.randomY() };
     new Cloud(position, this) ;
  },

  addPokeBalls: function(){
    const position = { x: 800, y: this.randomY() };
    this.pokeballs.push( new Pokeball(position, this) );
  },

  addMoreObstacles: function(){
    const balloonPosition = { x: 800, y: 0 };
    const buildingPosition = { x: 800, y: 600 };
    this.balloons.push(new Balloon(balloonPosition, this));
    this.buildings.push(new Building(buildingPosition, this));
  }
}

module.exports = Game;
