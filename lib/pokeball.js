const Pokeball = function(position, game){
  this.position = position;
  this.game = game;

  const ball = new Image();
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
};


Pokeball.prototype = {

  constantBombardment: function(){
    this.time ++;

    this.context.clearRect(this.position.x, this.position.y, 22, 22);
    this.position.x -= (this.constantVelocity);
    this.position.y += (this.time * this.ballGravity);

    if (!this.game.over() && (this.position.x >= -100 || this.position.y <= 1000)) {
      this.drawImg(this.position.x, this.position.y);
    }
  },

  drawImg: function(x, y){
    this.context.clearRect(x, y, 22, 22);
    this.context.drawImage(this.ball.image, x, y);
  },

  render: function(){
    var requestAnimationFrame = window.requestAnimationFrame ||
                                window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame ||
                                window.msRequestAnimationFrame;

    this.constantBombardment();
    requestAnimationFrame(this.render.bind(this));

  }

};

module.exports = Pokeball;
