class Menu {
  constructor (started, currentScore) {
    this.started = started
    this.currentScore = currentScore
    this.canvas = document.getElementById("menu")
    this.context = this.canvas.getContext("2d")

    this.render()
  }

  gameIsOverBuddy () {

    this.context.clearRect(0, 0, 800, 1000)
    const over = new Image()
    over.src = "./images/gameOver.png"
    over.onload = f=> {
      this.context.drawImage(over, 260, 300)
      this.revealScore()
    }

  }

  revealScore () {
    let whichImage = new Image()

    if (this.currentScore <= 6){
      whichImage.src = "./images/bronze.png"
    } else if (this.currentScore <= 20) {
      whichImage.src = "./images/silver.png"
    } else {
      whichImage.src = "./images/gold.png"
    }

    whichImage.onload = f => {
      this.context.drawImage(whichImage, 370, 470)
      this.context.lineWidth = 2
      this.context.strokeStyle = "black"

      this.context.font = "22px Share Tech Mono"
      this.context.strokeText(this.currentScore, 360, 520)
      this.context.stroke()
    }
  }

  startScoring (){
    this.context.clearRect(0, 0, 800, 1000)

    this.context.lineWidth = 3
    this.context.fillStyle = "white"
    this.context.strokeStyle = "black"

    this.context.font = "120px Share Tech Mono"
    this.context.fillText(this.currentScore, 390, 200)
    this.context.strokeText(this.currentScore, 390, 200)

    this.context.fill()
    this.context.stroke()
  }

  render (){
    const startButton = new Image()
    const instructions = new Image()
    const logo = new Image()
    startButton.src = "./images/startButton.png"
    instructions.src = "./images/instructions.png"
    logo.src = "./images/logo.png"
    startButton.onload = f=> {
      this.context.drawImage(startButton, 260, 400)
    }

    instructions.onload = f=> {
      this.context.drawImage(instructions, 230, 530)
    }

    logo.onload = f=> {
      this.context.drawImage(logo, 130, 180)
    }
  }

}

module.exports = Menu
