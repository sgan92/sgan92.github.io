class Menu {
  constructor (started, currentScore, game, songs) {
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

  retrieveBestScore (){
    if (document.cookie.length !== 0){
      this.bestScore = parseInt(document.cookie.split("=")[1]);
    }
  }

  toggleMusic () {
    if (!this.mute){
      this.musicIcon.src = "./images/saveEars.png";
      this.mute = true;
    } else {
      this.musicIcon.src = "./images/playSomeMusic.png";
      this.mute = false;
    }
    this.setSongState();
    this.drawMusicIcon();
  }

  showMusicIcon () {
    this.drawMusicIcon();
    const musicListener = document.addEventListener("keyup", (e) => {
      if (e.keyCode === 77){
        e.preventDefault();
        this.toggleMusic();
      }
      document.removeEventListener("keyup", musicListener, false);
    }, false)
  }

  drawMusicIcon () {
    this.musicIcon.onload = f => {
      this.context.clearRect(700, 900, 100, 100);
      this.context.drawImage(this.musicIcon, 700, 900);
    }
  }

  setSongState () {
    this.songs.forEach( song => {
      if (this.mute) {
        song.muted = true;
      } else {
        song.muted = false;
      }
    })
  }


  gameIsOverBuddy () {
    this.context.clearRect(700, 900, 100, 100);
    this.drawMusicIcon();
    this.context.clearRect(0, 0, 800, 1000);
    const over = new Image();
    over.src = "./images/gameOver.png";
    over.onload = f=> {
      this.context.drawImage(over, 260, 300);
      this.revealScore();
    }
    this.context.drawImage(this.musicIcon, 700, 900);
    this.retrieveBestScore();
  }

  revealScore () {
    this.isBestScore()

    let whichImage = new Image()

    if (this.currentScore <= 6){
      whichImage.src = "./images/bronze.png";
    } else if (this.currentScore <= 20) {
      whichImage.src = "./images/silver.png";
    } else {
      whichImage.src = "./images/gold.png";
    }

    whichImage.onload = f => {
      this.context.drawImage(whichImage, 370, 470);
      this.context.lineWidth = 2;
      this.context.strokeStyle = "black";

      this.context.font = "22px Share Tech Mono";
      this.context.strokeText(this.currentScore, 360, 520);
      this.context.stroke();
      this.revealBestScore();
    }
  }

  isBestScore () {
    if (this.bestScore < this.currentScore) {
      console.log("set bestScore");
      this.bestScore = this.currentScore;
      this.setBestCookie();
    }
  }

  setBestCookie () {
    const currentDate = new Date ();
    currentDate.setMonth(currentDate.getMonth() + 5);
    const expires = "expires=" + currentDate.toGMTString();
    document.cookie = "bestScore=" + this.bestScore + ";" + expires + ";path=/";
  }

  revealBestScore () {
    this.context.lineWidth = 2;
    this.context.strokeStyle = "black";

    this.context.font = "22 Share Tech Mono";
    this.context.strokeText("Your highest score is " + this.bestScore, 260, 610);
    this.context.stroke();
  }

  startScoring (){
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

  render (){
    const startButton = new Image();
    const instructions = new Image();
    const logo = new Image();
    startButton.src = "./images/startButton.png";
    instructions.src = "./images/instructions.png";
    logo.src = "./images/logo.png";
    startButton.onload = f=> {
      this.context.drawImage(startButton, 260, 400);
    }

    instructions.onload = f=> {
      this.context.drawImage(instructions, 230, 530);
    }

    logo.onload = f=> {
      this.context.drawImage(logo, 130, 180);
    }

    this.showMusicIcon();
  }

}

module.exports = Menu;
