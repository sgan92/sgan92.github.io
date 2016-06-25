const Cloud = function(position, game){
  this.position = position;
  this.game = game;
  this.canvas = document.getElementsByTagName("canvas")[0];
  this.context = this.canvas.getContext('2d');
  this.velocity = 1.5;

  this.instantiateClouds();

  const possibleClouds = [this.cloud1, this.cloud2, this.cloud3, this.cloud4];

  const randomCloud = possibleClouds[ Math.floor(Math.random() * 4 ) ]

  this.cloud = {
    image: randomCloud,
    width: randomCloud.width,
    height: randomCloud.height
  }

  this.render();

};


Cloud.prototype = {

  instantiateClouds: function(){
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
  },

  slowlyDrifting: function(){
    this.position.x -= this.velocity;

    if (this.position.x >= -300){
      this.drawImg(this.position.x, this.position.y, this.cloud.width, this.cloud.height);
    }

  },

  drawImg: function(x, y, width, height){
    this.context.clearRect(x, y, width, height);
    this.context.drawImage(this.cloud.image, x, y);
  },

  render: function(){
    var requestAnimationFrame = window.requestAnimationFrame ||
                                 window.mozRequestAnimationFrame ||
                                 window.webkitRequestAnimationFrame ||
                                 window.msRequestAnimationFrame;

     this.slowlyDrifting();
     requestAnimationFrame(this.render.bind(this));
  }

};

module.exports = Cloud;
