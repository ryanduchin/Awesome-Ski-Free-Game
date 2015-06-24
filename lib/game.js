(function () {
  if (typeof Ski === "undefined") {
    window.Ski = {};
  }

  var Game = Ski.Game = function () {
    this.skier = [];
    this.trees = [];
    this.boosts = [];

    this.addSki();
  };

  Game.BG_COLOR = "#000000";
  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.FPS = 32;
  // Game.NUM_Ski = 10;

  Game.prototype.add = function (object) {
    if (object instanceof Ski.Skier) {
      this.skier.push(object);
    } else if (object instanceof Ski.Tree) {
      this.trees.push(object);
    } else if (object instanceof Ski.Boost) {
      this.boosts.push(object);
    } else {
      throw "invalid object";
    }
  };

  Game.prototype.addTrees = function () {
    for (var i = 0; i < Game.NUM_Trees; i++) {
      this.add(new Ski.Tree({ game: this }));
    }
  };

  Game.prototype.addBoosts = function () {
    for (var i = 0; i < Game.NUM_Boosts; i++) {
      this.add(new Ski.Boost({ game: this }));
    }
  };

  Game.prototype.addSkier = function () {
    var skier = new Ski.Skier({
      // pos: this.randomPosition(),
      pos: [0,0],
      game: this
    });

    this.add(skier);

    return skier;
  };

  Game.prototype.allObjects = function () {
    return []
      .concat(this.skier)
      .concat(this.trees)
      .concat(this.boosts);
  };

  Game.prototype.checkCollisions = function () {
    var game = this;

    this.allObjects().forEach(function (obj1) {
      game.allObjects().forEach(function (obj2) {
        if (obj1 == obj2) {
          // don't allow self-collision
          return;
        }

        if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      });
    });
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0)
      || (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };

  Game.prototype.randomPosition = function () {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  };

  Game.prototype.remove = function (object) {
    if (object instanceof Ski.Tree) {
      this.trees.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Ski.Boost) {
      // var idx = this.boosts.indexOf(object);
      // this.Ski[idx] = new Ski.Asteroid({ game: this });
      this.boosts.splice(this.boosts.indexOf(object), 1);
    } else if (object instanceof Ski.Skier) {
      this.skier.splice(this.ships.indexOf(object), 1);
    } else {
      throw "invalid remove";
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.wrap = function (pos) {
    return [
      wrap(pos[0], Game.DIM_X), wrap(pos[1], Game.DIM_Y)
    ];

    function wrap (coord, max) {
      if (coord < 0) {
        return max - (coord % max);
      } else if (coord > max) {
        return coord % max;
      } else {
        return coord;
      }
    }
  };
})();
