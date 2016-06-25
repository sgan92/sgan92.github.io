# Dodge That Pokéball!
You can play the game live [here](http://sgan.me/DodgePokeball/index.html).
Dodge That Pokeball was inspired by [Flappy Bird](http://flappybird.io/), where instead of a bird, the player controls a Butterfree avoid buildings, Team Rocket, and the occassional pokéball.

![alt text](http://i.imgur.com/2xQudqh.png)

## Aspects of the Game
Multiple canvas elements are used here so that rendering of various elements can delegated.

As the building of the roof is triangular, the collision boxes can not be strictly rectangular. Same can be said with Team Rocket's balloon. Therefore, both of these obstacles had to be broken down into multiple collision boxes in order to make the game more accurate.



##Future Directions
- [ ] music
- [ ] give butterfree a move to get rid of pokeballs
