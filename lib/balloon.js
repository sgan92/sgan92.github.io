const Balloon = function(position, game){
  this.position = position;
  this.game = game;

  this.constantVelocity = 5;

  const balloon = new Image ();
  balloon.src = "../images/balloon.png";

  this.balloon = {
    image: balloon
  };

  this.canvas = document.getElementById("obstacles");
  this.context = this.canvas.getContext("2d");

  this.render();

};


Balloon.prototype = {

  goBalloonGo: function(){
    this.context.clearRect(this.position.x, this.position.y, 340, 234 );
    this.position.x -= this.constantVelocity;

    if (!this.game.over() && this.position.x >= -400 ){
      this.drawImg(this.position.x, this.position.y);

    } else if (this.game.over()){
      this.game.overScreen();
      window.clearInterval(this.balloonInterval);
      this.context.clearRect(0, 0, 800, 1000);
    }
  },

  drawImg: function(x, y){
    this.context.clearRect(x, y, 340, 234);
    this.context.drawImage(this.balloon.image, x, y);
  },

  render: function(){

    this.balloonInterval = window.setInterval(this.goBalloonGo.bind(this), 17);
  }

};

module.exports = Balloon;
