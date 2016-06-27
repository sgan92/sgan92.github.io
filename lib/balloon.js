class Balloon {

  constructor (position, game) {
    this.position = position;
    this.game = game;

    this.constantVelocity = 5;

    const balloon = new Image ();
    balloon.src = "./images/balloon.png";

    this.balloon = {
      image: balloon
    };

    this.canvas = document.getElementById("obstacles");
    this.context = this.canvas.getContext("2d");

    this.render();
  }

  goBalloonGo () {
    this.context.clearRect(this.position.x, this.position.y, 340, 234 );
    this.position.x -= this.constantVelocity;

    if (!this.game.over() && this.position.x >= -400 ){
      this.drawImg(this.position.x, this.position.y);
    }
  }

  drawImg (x, y) {
    this.context.clearRect(x, y, 340, 234);
    this.context.drawImage(this.balloon.image, x, y);
  }

  render () {
    var requestAnimationFrame = window.requestAnimationFrame ||
                                window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame ||
                                window.msRequestAnimationFrame;

    this.goBalloonGo();
    this.animation = requestAnimationFrame(this.render.bind(this));
    if (this.game.over()){
      window.cancelAnimationFrame(this.animation);
      this.game.overScreen();
      this.context.clearRect(0, 0, 800, 1000);
    }
  }

};

module.exports = Balloon;
