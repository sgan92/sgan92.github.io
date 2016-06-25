class Building {

  constructor (position, game){
    this.position = position
    this.game = game

    this.constantVelocity = 5

    const building = new Image ()
    building.src = "./images/building.png"

    this.building = {
      image: building
    };

    this.canvas = document.getElementById("obstacles")
    this.context = this.canvas.getContext("2d")

    this.render()
  }

  goBuildingGo () {
   this.context.clearRect(this.position.x, this.position.y, 402, 548 )
   this.position.x -= this.constantVelocity

   if (!this.game.over() && this.position.x >= -1200 ){
     this.drawImg(this.position.x, this.position.y)
   }
   else if (this.game.over()){
     window.clearInterval(this.buildingInterval)
   }
 }

 drawImg (x, y) {
   this.context.clearRect(x, y, 402, 548)
   this.context.drawImage(this.building.image, x, y)
 }

 render () {
   this.buildingInterval = window.setInterval(this.goBuildingGo.bind(this), 17)
 }

}


module.exports = Building
