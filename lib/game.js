(function () {
  if (typeof Ski === "undefined") {
    window.Ski = {};
  }

  var Game = Ski.Game = function () {
    this.trees = [];
    this.skier = new Ski.Skier({
      pos: [Game.DIM_X * 1/2, Game.DIM_Y * 1/10],
      game: this
    });
    this.addTrees();
  };

  Game.BG_COLOR = "#FFFFFF";
  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.FPS = 32;
  Game.NUM_Trees = 5;

  Game.prototype.initialize = function () {
    this.trees = [];
    this.skier = new Ski.Skier({
      pos: [Game.DIM_X * 1/2, Game.DIM_Y * 1/10],
      game: this
    });
    this.addTrees();
  };

  Game.prototype.add = function (object) {
    if (object instanceof Ski.Tree) {
      this.trees.push(object);
    // } else if (object instanceof Ski.Boost) {
    //   this.boosts.push(object);
    } else {
      throw "invalid object";
    }
  };

  Game.prototype.addTrees = function () {
    for (var i = 0; i < Game.NUM_Trees; i++) {
      this.add(new Ski.Tree({
        game: this,
        pos: this.randomPosition()
      }));
    }
  };

  Game.prototype.allObjects = function () {
    return this.trees;
      // .concat(this.trees)
  };

  Game.prototype.checkCollisions = function () {
    var game = this;
    this.allObjects().forEach(function (obj) {
      if (obj.isCollidedWith(game.skier)) {
        // game.initialize();
      }
    });
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    // debugger;
    this.skier.draw(ctx);
    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
  };

  Game.prototype.checkOutOfBounds = function () {
    this.keepSkierInBounds(this.skier.pos);
    var game = this;
    this.allObjects().forEach(function (obj) {
      if (game.isOutOfBounds(obj.pos)) {
        game.remove(obj);
      }
    });
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0)
      || (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  };

  Game.prototype.keepSkierInBounds = function (pos) {
    if ((pos[0] < 0) || (pos[0] > Game.DIM_X)) {
      this.skier.pos = this.wrap(pos);
    } else if (pos[1] < 0) {
      this.skier.pos[1] = 0;
      this.skier.vel[1] = 0;
    } else if (pos[1] > Game.DIM_Y) {
      this.skier.pos[1] = Game.DIM_Y - this.skier.height;
      this.skier.vel[1] = 0;
    }
  };

  Game.prototype.moveObjects = function () {
    this.skier.move();
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

  Game.prototype.randomBottomPosition = function () {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y
    ];
  };

  Game.prototype.remove = function (object) {
    if (object instanceof Ski.Tree) {
      this.trees.splice(this.trees.indexOf(object), 1);
      this.add(new Ski.Tree({
        game: this,
        pos: this.randomBottomPosition()
      }));
    // } else if (object instanceof Ski.Boost) {
      // this.boosts.splice(this.boosts.indexOf(object), 1);
      //  // var idx = this.boosts.indexOf(object);
      //  // this.Ski[idx] = new Ski.Asteroid({ game: this });
    // } else if (object instanceof Ski.Skier) {
    //   this.skier.splice(this.ships.indexOf(object), 1);
    } else {
      throw "invalid remove";
    }
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

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
    this.checkOutOfBounds();
  };


})();
