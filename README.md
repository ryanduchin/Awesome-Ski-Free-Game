# Ski Game![description]

**[Live Demo][live-demo]**

[live-demo]:
[description]:
Welcome to Ski Game!

Use the arrow keys to move and the spacebar to jump.
Tap down repeatedly to go faster or up to slow down.
You start off with three lives.

This game was inspired by the old Microsoft Ski Free Game.

I used keymaster.js to handle user inputs. The GameView class passes this to the Game class which moves the skier horizontally and the rest of the objects vertically.

Avoid the trees or you will surely crash! Jump over rocks to survive
You get points for going faster, jumping, and jumping over rocks

Make enough progress and you will get attacked by a snowman!
Survive long enough you'll get extra lives.

Secret: press 'F' to go faster!
[This works on the original game too](https://xkcd.com/667/)

The game scales the jump time based on the speed the skiier is travelling.
I also added some physics with different friction values that reduce the speed of the skiier with each step (low friction downhill)

Every time a rock or tree reaches the edge of the screen a new one is placed on the bottom at a random position.

Images of the skiier were taken from skifreeonline.com by Chris Pirih
