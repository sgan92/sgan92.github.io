class Pokemon {
  constructor (position, game) {
    this.position = position
    this.game = game
    this.width = 88
    this.height = 88

    this.gravity = 0.4
    this.velocity = 0
    this.time = 0
    this.fly = -15

    this.makeUpSprite()
    this.makeDownSprite()

    this.canvas = document.getElementById("pokemon")
    this.context = this.canvas.getContext("2d")

    this.addKeyListener()
    this.render()
  }

  makeUpSprite () {
    const pkmnSpriteUp = new Image()
    pkmnSpriteUp.src = "./images/bflyup.png"

    this.spriteUp = {
      image: pkmnSpriteUp,
    }
  }

  makeDownSprite () {
    const pkmnSpriteDown = new Image()
    pkmnSpriteDown.src = "./images/bflydown.png"

    this.spriteDown = {
      image: pkmnSpriteDown,
    }
  }

  addKeyListener () {
    this.fn = this.flyPokemonFly.bind(this)
    document.addEventListener("keyup", this.fn, false)
  }

  flyPokemonFly (e) {
    if (e && e.keyCode === 87){
      this.time = 0
      this.velocity = this.fly
      this.context.clearRect(this.position.x, this.position.y, 800, 1000)
      this.position.y -= this.velocity
      this.drawImg(this.spriteUp.image, this.position.x, this.position.y)
    } else {
      this.justGravity()
    }

  }

  justGravity () {
    this.time ++
    this.velocity += this.gravity
    this.context.clearRect(this.position.x, this.position.y, 800, 1000)
    this.position.y += this.velocity
    if (this.time <= 15 && !this.game.over() ){
      this.drawImg(this.spriteUp.image, this.position.x, this.position.y)
    } else if ( !this.game.over() ){
      this.drawImg(this.spriteDown.image, this.position.x, this.position.y)
    }
  }

  startFlapping () {

    this.gravityTime = 0
    while (this.upTime < 25){
      this.position.x += 0.2
      this.context.clearRect(this.position.x, this.position.y, 800, 1000)
      this.position.y -= (this.gravity * this.upTime)
      this.drawImg( this.spriteUp.image, this.position.x, this.position.y)
      this.upTime += 1.25
    }
    this.upTime = 0

  }


  drawImg (image, x, y) {
    this.context.clearRect(x, y, 800, 1000)
    this.context.drawImage(image, x, y)
  }

  render () {
    var requestAnimationFrame = window.requestAnimationFrame ||
                                window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame ||
                                window.msRequestAnimationFrame

    this.flyPokemonFly()
    this.animation = requestAnimationFrame(this.render.bind(this))
    if (this.game.over()){
      window.cancelAnimationFrame(this.animation)
      this.context.clearRect(this.position.x, this.position.y, 800, 1000)
      document.removeEventListener("keyup", this.fn)
      this.game.overScreen()
    }
  }
}


module.exports = Pokemon
