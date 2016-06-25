const Game = require("./game");

document.addEventListener("DOMContentLoaded", function() {
  const Background = document.getElementById("background");
  const Pokemon = document.getElementById("pokemon");
  const Obstacles = document.getElementById("obstacles");
  const Pokeballs = document.getElementById("pokeballs");
  const Menu = document.getElementById("menu");

  Background.width = 800;
  Pokemon.width = 800;
  Obstacles.width = 800;
  Pokeballs.width = 800;
  Menu.width = 1000;

  Background.height = 1000;
  Pokemon.height = 1000;
  Obstacles.height = 1000;
  Pokeballs.height = 1000;
  Menu.height = 1000;

  const newGame = new Game();
})
