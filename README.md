# Dodge That Pokéball!
You can play the game live [here](http://sgan.me/DodgePokeball/index.html).
Dodge That Pokeball was inspired by [Flappy Bird](http://flappybird.io/), where instead of a bird, the player controls a Butterfree avoid buildings, Team Rocket, and the occassional pokéball.

![alt text](http://i.imgur.com/2xQudqh.png)

## Aspects of the Game

Multiple canvas elements are used here so that rendering of various elements can delegated.

As the building of the roof is triangular, the collision boxes can not be strictly rectangular. Same can be said with Team Rocket's balloon. Therefore, both of these obstacles had to be broken down into multiple collision boxes in order to make the game more accurate.

For instance, the building has three collision boxes, each of which is checked. `this.checkHitBoxes` is a method that checks each hit box regardless of the obstacle type in order to make the code more DRY.

```javascript
  checkBuildings (xPos, yPos) {
    if (
      this.checkHitBoxes(xPos + 15, yPos + 130 , 377, 274) ||
      this.checkHitBoxes(xPos + 30, yPos + 70, 251, 61) ||
      this.checkHitBoxes(xPos + 100, yPos + 20, 50, 50)
    ){
      return true
    }
  }
```

The score of this game is also saved in the browser's cookies so that refreshing/coming back to the browser will not effect the high score for the individual. The expiry date for this cookie is 5 months, so if no high score is set within 5 months, the high score will reset.

```javascript
  setBestCookie () {
    const currentDate = new Date ();
    currentDate.setMonth(currentDate.getMonth() + 5);
    const expires = "expires=" + currentDate.toGMTString();
    document.cookie = "bestScore=" + this.bestScore + ";" + expires + ";path=/";
  }
```

The background music is taken from a fan project known as Pokemon ReOrchestrated (and since been closed).

##Future Directions
- [ ] give butterfree a move to get rid of pokeballs
