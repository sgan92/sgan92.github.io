/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Game = __webpack_require__(1);
	
	document.addEventListener("DOMContentLoaded", function (f) {
	  var Background = document.getElementById("background");
	  var Pokemon = document.getElementById("pokemon");
	  var Obstacles = document.getElementById("obstacles");
	  var Pokeballs = document.getElementById("pokeballs");
	  var Menu = document.getElementById("menu");
	
	  Background.width = 800;
	  Pokemon.width = 800;
	  Obstacles.width = 800;
	  Pokeballs.width = 800;
	  Menu.width = 800;
	
	  Background.height = 1000;
	  Pokemon.height = 1000;
	  Obstacles.height = 1000;
	  Pokeballs.height = 1000;
	  Menu.height = 1000;
	
	  var newGame = new Game();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Cloud = __webpack_require__(2);
	var Pokemon = __webpack_require__(3);
	var Pokeball = __webpack_require__(4);
	var Building = __webpack_require__(5);
	var Balloon = __webpack_require__(6);
	var Menu = __webpack_require__(7);
	
	var Game = function () {
	  function Game() {
	    _classCallCheck(this, Game);
	
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
	
	  _createClass(Game, [{
	    key: "instantiateMusic",
	    value: function instantiateMusic() {
	      this.introMusic = new Audio("./music/intro.mp3");
	      this.mainMusic = new Audio("./music/main.mp3");
	      this.endMusic = new Audio("./music/end.mp3");
	      this.collide = new Audio("./music/rip.wav");
	
	      this.songs = [this.introMusic, this.mainMusic, this.endMusic];
	    }
	  }, {
	    key: "backToBeginning",
	    value: function backToBeginning(audioFile) {
	      audioFile.addEventListener("ended", function (f) {
	        audioFile.currentTime = 0;
	        audioFile.play();
	      }, false);
	    }
	  }, {
	    key: "startScreen",
	    value: function startScreen() {
	      this.fn = this.startGame.bind(this);
	      document.addEventListener("keyup", this.fn, false);
	      this.menu = new Menu(false, 0, this, this.songs);
	      window.setInterval(this.generateClouds.bind(this), 5000);
	      this.introMusic.play();
	      this.backToBeginning(this.introMusic);
	    }
	  }, {
	    key: "startGame",
	    value: function startGame(e) {
	      if (e.keyCode === 13 && this.gameOver) {
	        this.introMusic.pause();
	        this.endMusic.pause();
	
	        this.context.clearRect(0, 0, 800, 1000);
	        document.removeEventListener("keyup", this.fn, false);
	        this.gameOver = false;
	
	        this.pokeballs = [];
	        this.buildings = [];
	        this.balloons = [];
	
	        var startingPosition = { x: 80, y: 290 };
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
	  }, {
	    key: "over",
	    value: function over() {
	      this.checkCollision(this.pokeballs, "pokeball");
	      this.checkCollision(this.buildings, "building");
	      this.checkCollision(this.balloons, "balloon");
	      return this.gameOver;
	    }
	  }, {
	    key: "checkCollision",
	    value: function checkCollision(array, type) {
	      var _this = this;
	
	      array.forEach(function (item) {
	        if (item.position.x <= -500) {
	          array.splice(array.indexOf(item), 1);
	        } else {
	          if (_this.isBetween(type, item.position.x, item.position.y, item) || _this.pokemon.position.y < -100 || _this.pokemon.position.y > 1200) {
	            _this.gameOver = true;
	          }
	        }
	      });
	    }
	  }, {
	    key: "isBetween",
	    value: function isBetween(type, itemX, itemY, item) {
	      var width = void 0;
	      var height = void 0;
	      var hitPokemon = false;
	
	      if (type === "pokeball") {
	        hitPokemon = this.checkPokeBalls(itemX, itemY);
	      } else if (type === "building") {
	        hitPokemon = this.checkBuildings(itemX, itemY);
	      } else if (type === "balloon") {
	        hitPokemon = this.checkBalloons(itemX, itemY);
	      }
	
	      if (hitPokemon) {
	        return true;
	      } else if (type === "building" && this.pokemon.position.x >= itemX + 400) {
	        this.buildings.splice(this.buildings.indexOf(item), 1);
	        this.menu.currentScore += 1;
	        this.menu.startScoring();
	        return false;
	      }
	    }
	  }, {
	    key: "checkBalloons",
	    value: function checkBalloons(xPos, yPos) {
	      if (this.checkHitBoxes(xPos, yPos - 172, 323, 233) || this.checkHitBoxes(xPos + 90, yPos + 55, 121, 167)) {
	        return true;
	      }
	      return false;
	    }
	  }, {
	    key: "checkBuildings",
	    value: function checkBuildings(xPos, yPos) {
	      if (this.checkHitBoxes(xPos + 15, yPos + 130, 377, 274) || this.checkHitBoxes(xPos + 30, yPos + 70, 251, 61) || this.checkHitBoxes(xPos + 100, yPos + 20, 50, 50)) {
	        return true;
	      }
	    }
	  }, {
	    key: "checkPokeBalls",
	    value: function checkPokeBalls(xPos, yPos) {
	      if (this.checkHitBoxes(xPos, yPos, 22, 22)) {
	        return true;
	      }
	      return false;
	    }
	  }, {
	    key: "checkHitBoxes",
	    value: function checkHitBoxes(itemX, itemY, width, height) {
	      if (!(this.pokemon.position.x > itemX + width || this.pokemon.position.x + this.pokemon.width < itemX || this.pokemon.position.y > itemY + height || this.pokemon.position.y + this.pokemon.height < itemY)) {
	        return true;
	      }
	    }
	  }, {
	    key: "overScreen",
	    value: function overScreen() {
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
	  }, {
	    key: "randomY",
	    value: function randomY() {
	      return 550 * Math.random();
	    }
	  }, {
	    key: "chooseRandomY",
	    value: function chooseRandomY() {
	      var randomIndex = [0, 1, 2, 3];
	      return randomIndex[Math.floor(Math.random() * randomIndex.length)];
	    }
	  }, {
	    key: "generateClouds",
	    value: function generateClouds() {
	      var position = { x: 800, y: this.randomY() };
	      new Cloud(position, this);
	    }
	  }, {
	    key: "addPokeBalls",
	    value: function addPokeBalls() {
	      var position = { x: 800, y: this.randomY() };
	      this.pokeballs.push(new Pokeball(position, this));
	    }
	  }, {
	    key: "addMoreObstacles",
	    value: function addMoreObstacles() {
	      var balloonYs = [0, -50, -100, -150];
	      var buildingYs = [600, 550, 500, 450];
	      var randomIndex = this.chooseRandomY();
	      var balloonPosition = { x: 800, y: balloonYs[randomIndex] };
	      var buildingPosition = { x: 800, y: buildingYs[randomIndex] };
	      this.balloons.push(new Balloon(balloonPosition, this));
	      this.buildings.push(new Building(buildingPosition, this));
	    }
	  }]);
	
	  return Game;
	}();
	
	module.exports = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Cloud = function () {
	  function Cloud(position, game) {
	    _classCallCheck(this, Cloud);
	
	    this.position = position;
	    this.game = game;
	    this.canvas = document.getElementsByTagName("canvas")[0];
	    this.context = this.canvas.getContext('2d');
	    this.velocity = 1.5;
	
	    this.instantiateClouds();
	
	    var possibleClouds = [this.cloud1, this.cloud2, this.cloud3, this.cloud4];
	
	    var randomCloud = possibleClouds[Math.floor(Math.random() * 4)];
	
	    this.cloud = {
	      image: randomCloud,
	      width: randomCloud.width,
	      height: randomCloud.height
	    };
	
	    this.render();
	  }
	
	  _createClass(Cloud, [{
	    key: "instantiateClouds",
	    value: function instantiateClouds() {
	      this.cloud1 = new Image();
	      this.cloud1.src = "./images/cloud1.png";
	      this.cloud1.height = 200;
	      this.cloud1.width = 300;
	
	      this.cloud2 = new Image();
	      this.cloud2.src = "./images/cloud2.png";
	      this.cloud2.height = 108;
	      this.cloud2.width = 231;
	
	      this.cloud3 = new Image();
	      this.cloud3.src = "./images/cloud3.png";
	      this.cloud3.height = 108;
	      this.cloud3.width = 214;
	
	      this.cloud4 = new Image();
	      this.cloud4.src = "./images/cloud4.png";
	      this.cloud4.height = 240;
	      this.cloud4.width = 240;
	    }
	  }, {
	    key: "slowlyDrifting",
	    value: function slowlyDrifting() {
	      this.position.x -= this.velocity;
	
	      if (this.position.x >= -300) {
	        this.drawImg(this.position.x, this.position.y, this.cloud.width, this.cloud.height);
	      }
	    }
	  }, {
	    key: "drawImg",
	    value: function drawImg(x, y, width, height) {
	      this.context.clearRect(x, y, width, height);
	      this.context.drawImage(this.cloud.image, x, y);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	      this.slowlyDrifting();
	      requestAnimationFrame(this.render.bind(this));
	    }
	  }]);
	
	  return Cloud;
	}();
	
	;
	
	module.exports = Cloud;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Pokemon = function () {
	  function Pokemon(position, game) {
	    _classCallCheck(this, Pokemon);
	
	    this.position = position;
	    this.game = game;
	    this.width = 88;
	    this.height = 88;
	
	    this.gravity = 0.4;
	    this.velocity = 0;
	    this.time = 0;
	    this.fly = -15;
	
	    this.flySound = new Audio("./music/flap.wav");
	    this.makeUpSprite();
	    this.makeDownSprite();
	
	    this.canvas = document.getElementById("pokemon");
	    this.context = this.canvas.getContext("2d");
	
	    this.addKeyListener();
	    this.render();
	  }
	
	  _createClass(Pokemon, [{
	    key: "makeUpSprite",
	    value: function makeUpSprite() {
	      var pkmnSpriteUp = new Image();
	      pkmnSpriteUp.src = "./images/bflyup.png";
	
	      this.spriteUp = {
	        image: pkmnSpriteUp
	      };
	    }
	  }, {
	    key: "makeDownSprite",
	    value: function makeDownSprite() {
	      var pkmnSpriteDown = new Image();
	      pkmnSpriteDown.src = "./images/bflydown.png";
	
	      this.spriteDown = {
	        image: pkmnSpriteDown
	      };
	    }
	  }, {
	    key: "addKeyListener",
	    value: function addKeyListener() {
	      this.fn = this.flyPokemonFly.bind(this);
	      document.addEventListener("keyup", this.fn, false);
	    }
	  }, {
	    key: "flyPokemonFly",
	    value: function flyPokemonFly(e) {
	      if (e && e.keyCode === 87) {
	        this.time = 0;
	        this.velocity = this.fly;
	        this.context.clearRect(this.position.x, this.position.y, 800, 1000);
	        this.position.y -= this.velocity;
	        this.drawImg(this.spriteUp.image, this.position.x, this.position.y);
	        this.flySound.play();
	        this.flySound.currentTime = 0;
	      } else {
	        this.justGravity();
	      }
	    }
	  }, {
	    key: "justGravity",
	    value: function justGravity() {
	      this.time++;
	      this.velocity += this.gravity;
	      this.context.clearRect(this.position.x, this.position.y, 800, 1000);
	      this.position.y += this.velocity;
	      if (this.time <= 15 && !this.game.over()) {
	        this.drawImg(this.spriteUp.image, this.position.x, this.position.y);
	      } else if (!this.game.over()) {
	        this.drawImg(this.spriteDown.image, this.position.x, this.position.y);
	      }
	    }
	  }, {
	    key: "startFlapping",
	    value: function startFlapping() {
	
	      this.gravityTime = 0;
	      while (this.upTime < 25) {
	        this.position.x += 0.2;
	        this.context.clearRect(this.position.x, this.position.y, 800, 1000);
	        this.position.y -= this.gravity * this.upTime;
	        this.drawImg(this.spriteUp.image, this.position.x, this.position.y);
	        this.upTime += 1.25;
	      }
	      this.upTime = 0;
	    }
	  }, {
	    key: "drawImg",
	    value: function drawImg(image, x, y) {
	      this.context.clearRect(x, y, 800, 1000);
	      this.context.drawImage(image, x, y);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	
	      this.flyPokemonFly();
	      this.animation = requestAnimationFrame(this.render.bind(this));
	      if (this.game.over()) {
	        window.cancelAnimationFrame(this.animation);
	        this.context.clearRect(this.position.x, this.position.y, 800, 1000);
	        document.removeEventListener("keyup", this.fn);
	        this.game.overScreen();
	      }
	    }
	  }]);
	
	  return Pokemon;
	}();
	
	module.exports = Pokemon;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Pokeball = function () {
	  function Pokeball(position, game) {
	    _classCallCheck(this, Pokeball);
	
	    this.position = position;
	    this.game = game;
	
	    var ball = new Image();
	    ball.src = "./images/ball.png";
	
	    this.ball = {
	      image: ball
	    };
	
	    this.canvas = document.getElementById("pokeballs");
	    this.context = this.canvas.getContext("2d");
	
	    this.constantVelocity = 14;
	    this.ballGravity = 0.2;
	    this.time = 0;
	
	    this.render();
	  }
	
	  _createClass(Pokeball, [{
	    key: "constantBombardment",
	    value: function constantBombardment() {
	      this.time++;
	
	      this.context.clearRect(this.position.x, this.position.y, 22, 22);
	      this.position.x -= this.constantVelocity;
	      this.position.y += this.time * this.ballGravity;
	
	      if (!this.game.over() && (this.position.x >= -100 || this.position.y <= 1000)) {
	        this.drawImg(this.position.x, this.position.y);
	      }
	    }
	  }, {
	    key: "drawImg",
	    value: function drawImg(x, y) {
	      this.context.clearRect(x, y, 22, 22);
	      this.context.drawImage(this.ball.image, x, y);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	
	      this.constantBombardment();
	      requestAnimationFrame(this.render.bind(this));
	    }
	  }]);
	
	  return Pokeball;
	}();
	
	module.exports = Pokeball;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Building = function () {
	  function Building(position, game) {
	    _classCallCheck(this, Building);
	
	    this.position = position;
	    this.game = game;
	
	    this.constantVelocity = 5;
	
	    var building = new Image();
	    building.src = "./images/building.png";
	
	    this.building = {
	      image: building
	    };
	
	    this.canvas = document.getElementById("obstacles");
	    this.context = this.canvas.getContext("2d");
	
	    this.render();
	  }
	
	  _createClass(Building, [{
	    key: "goBuildingGo",
	    value: function goBuildingGo() {
	      this.context.clearRect(this.position.x, this.position.y, 402, 548);
	      this.position.x -= this.constantVelocity;
	
	      if (!this.game.over() && this.position.x >= -1200) {
	        this.drawImg(this.position.x, this.position.y);
	      }
	    }
	  }, {
	    key: "drawImg",
	    value: function drawImg(x, y) {
	      this.context.clearRect(x, y, 402, 548);
	      this.context.drawImage(this.building.image, x, y);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	
	      this.goBuildingGo();
	      this.animation = requestAnimationFrame(this.render.bind(this));
	      if (this.game.over()) {
	        window.cancelAnimationFrame(this.animation);
	        this.game.overScreen();
	      }
	    }
	  }]);
	
	  return Building;
	}();
	
	module.exports = Building;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Balloon = function () {
	  function Balloon(position, game) {
	    _classCallCheck(this, Balloon);
	
	    this.position = position;
	    this.game = game;
	
	    this.constantVelocity = 5;
	
	    var balloon = new Image();
	    balloon.src = "./images/balloon.png";
	
	    this.balloon = {
	      image: balloon
	    };
	
	    this.canvas = document.getElementById("obstacles");
	    this.context = this.canvas.getContext("2d");
	
	    this.render();
	  }
	
	  _createClass(Balloon, [{
	    key: "goBalloonGo",
	    value: function goBalloonGo() {
	      this.context.clearRect(this.position.x, this.position.y, 340, 234);
	      this.position.x -= this.constantVelocity;
	
	      if (!this.game.over() && this.position.x >= -400) {
	        this.drawImg(this.position.x, this.position.y);
	      }
	    }
	  }, {
	    key: "drawImg",
	    value: function drawImg(x, y) {
	      this.context.clearRect(x, y, 340, 234);
	      this.context.drawImage(this.balloon.image, x, y);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	
	      this.goBalloonGo();
	      this.animation = requestAnimationFrame(this.render.bind(this));
	      if (this.game.over()) {
	        window.cancelAnimationFrame(this.animation);
	        this.game.overScreen();
	        this.context.clearRect(0, 0, 800, 1000);
	      }
	    }
	  }]);
	
	  return Balloon;
	}();
	
	;
	
	module.exports = Balloon;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Menu = function () {
	  function Menu(started, currentScore, game, songs) {
	    _classCallCheck(this, Menu);
	
	    this.started = started;
	    this.game = game;
	    this.songs = songs;
	    this.currentScore = currentScore;
	
	    this.bestScore = 0;
	    this.musicIcon = new Image();
	    this.musicIcon.src = "./images/playSomeMusic.png";
	
	    this.canvas = document.getElementById("menu");
	    this.context = this.canvas.getContext("2d");
	    this.audioButton = document.getElementById("audio");
	    this.mute = false;
	    this.render();
	  }
	
	  _createClass(Menu, [{
	    key: "retrieveBestScore",
	    value: function retrieveBestScore() {
	      if (document.cookie.length !== 0) {
	        this.bestScore = parseInt(document.cookie.split("=")[1]);
	      }
	    }
	  }, {
	    key: "toggleMusic",
	    value: function toggleMusic() {
	      if (!this.mute) {
	        this.musicIcon.src = "./images/saveEars.png";
	        this.mute = true;
	      } else {
	        this.musicIcon.src = "./images/playSomeMusic.png";
	        this.mute = false;
	      }
	      this.setSongState();
	      this.drawMusicIcon();
	    }
	  }, {
	    key: "showMusicIcon",
	    value: function showMusicIcon() {
	      var _this = this;
	
	      this.drawMusicIcon();
	      var musicListener = document.addEventListener("keyup", function (e) {
	        if (e.keyCode === 77) {
	          e.preventDefault();
	          _this.toggleMusic();
	        }
	        document.removeEventListener("keyup", musicListener, false);
	      }, false);
	    }
	  }, {
	    key: "drawMusicIcon",
	    value: function drawMusicIcon() {
	      var _this2 = this;
	
	      this.musicIcon.onload = function (f) {
	        _this2.context.clearRect(700, 900, 100, 100);
	        _this2.context.drawImage(_this2.musicIcon, 700, 900);
	      };
	    }
	  }, {
	    key: "setSongState",
	    value: function setSongState() {
	      var _this3 = this;
	
	      this.songs.forEach(function (song) {
	        if (_this3.mute) {
	          song.muted = true;
	        } else {
	          song.muted = false;
	        }
	      });
	    }
	  }, {
	    key: "gameIsOverBuddy",
	    value: function gameIsOverBuddy() {
	      var _this4 = this;
	
	      this.context.clearRect(700, 900, 100, 100);
	      this.drawMusicIcon();
	      this.context.clearRect(0, 0, 800, 1000);
	      var over = new Image();
	      over.src = "./images/gameOver.png";
	      over.onload = function (f) {
	        _this4.context.drawImage(over, 260, 300);
	        _this4.revealScore();
	      };
	      this.context.drawImage(this.musicIcon, 700, 900);
	      this.retrieveBestScore();
	    }
	  }, {
	    key: "revealScore",
	    value: function revealScore() {
	      var _this5 = this;
	
	      this.isBestScore();
	
	      var whichImage = new Image();
	
	      if (this.currentScore <= 6) {
	        whichImage.src = "./images/bronze.png";
	      } else if (this.currentScore <= 20) {
	        whichImage.src = "./images/silver.png";
	      } else {
	        whichImage.src = "./images/gold.png";
	      }
	
	      whichImage.onload = function (f) {
	        _this5.context.drawImage(whichImage, 370, 470);
	        _this5.context.lineWidth = 2;
	        _this5.context.strokeStyle = "black";
	
	        _this5.context.font = "22px Share Tech Mono";
	        _this5.context.strokeText(_this5.currentScore, 360, 520);
	        _this5.context.stroke();
	        _this5.revealBestScore();
	      };
	    }
	  }, {
	    key: "isBestScore",
	    value: function isBestScore() {
	      if (this.bestScore < this.currentScore) {
	        console.log("set bestScore");
	        this.bestScore = this.currentScore;
	        this.setBestCookie();
	      }
	    }
	  }, {
	    key: "setBestCookie",
	    value: function setBestCookie() {
	      var currentDate = new Date();
	      currentDate.setMonth(currentDate.getMonth() + 5);
	      var expires = "expires=" + currentDate.toGMTString();
	      document.cookie = "bestScore=" + this.bestScore + ";" + expires + ";path=/";
	    }
	  }, {
	    key: "revealBestScore",
	    value: function revealBestScore() {
	      this.context.lineWidth = 2;
	      this.context.strokeStyle = "black";
	
	      this.context.font = "22 Share Tech Mono";
	      this.context.strokeText("Your highest score is " + this.bestScore, 260, 610);
	      this.context.stroke();
	    }
	  }, {
	    key: "startScoring",
	    value: function startScoring() {
	      this.context.clearRect(0, 0, 800, 1000);
	
	      this.context.lineWidth = 3;
	      this.context.fillStyle = "white";
	      this.context.strokeStyle = "black";
	
	      this.context.font = "120px Share Tech Mono";
	      this.context.fillText(this.currentScore, 360, 200);
	      this.context.strokeText(this.currentScore, 360, 200);
	
	      this.context.fill();
	      this.context.stroke();
	
	      this.context.clearRect(700, 900, 100, 100);
	      this.context.drawImage(this.musicIcon, 700, 900);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this6 = this;
	
	      var startButton = new Image();
	      var instructions = new Image();
	      var logo = new Image();
	      startButton.src = "./images/startButton.png";
	      instructions.src = "./images/instructions.png";
	      logo.src = "./images/logo.png";
	      startButton.onload = function (f) {
	        _this6.context.drawImage(startButton, 260, 400);
	      };
	
	      instructions.onload = function (f) {
	        _this6.context.drawImage(instructions, 230, 530);
	      };
	
	      logo.onload = function (f) {
	        _this6.context.drawImage(logo, 130, 180);
	      };
	
	      this.showMusicIcon();
	    }
	  }]);
	
	  return Menu;
	}();
	
	module.exports = Menu;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map