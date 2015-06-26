(function () {
  if (typeof Ski === "undefined") {
    window.Ski = {};
  }

  var Game = Ski.Game = function () {
    this.initialize();
  };

  Game.BG_COLOR = "#FFFFFF";
  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.FPS = 32;
  Game.NUM_Trees = 15;
  Game.STEP_VERT = 3;
  Game.STEP_HOR = 1;

  Game.prototype.initialize = function () {
    this.trees = [];
    this.skier = new Ski.Skier({
      pos: [Game.DIM_X * 1/2, Game.DIM_Y * 4/10],
      game: this
    });
    this.addTrees();
    this.vel = [0, 0];
  };

  Game.prototype.add = function (object) {
    if (object instanceof Ski.Tree) {
      this.trees.push(object);
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
        // console.log('collided');
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
    this.skier.move(this.vel[0]);
    var game = this;
    this.allObjects().forEach(function (object) {
      object.move(game.vel[1]);
    });
    this.adjustGameVel();
  };

  Game.prototype.adjustGameVel = function () {
    this.vel[0] = this.vel[0] / 1.1;
    if (this.vel[1] > 0) {
      this.vel[1] = this.vel[1] / 1.6;
    } else {
      this.vel[1] = this.vel[1] / 1.004;
    }
  };

  Game.prototype.remove = function (object) {
    if (object instanceof Ski.Tree) {
      this.trees.splice(this.trees.indexOf(object), 1);
      this.add(new Ski.Tree({
        game: this,
        pos: this.randomBottomPosition()
      }));
    } else {
      throw "invalid remove";
    }
  };

  Game.prototype.input = function (move) {
    this.vel[0] += move[0] * Game.STEP_HOR;
    this.vel[1] += move[1] * Game.STEP_VERT;
    this.skier.input(move[0], Game.STEP_HOR);
    if (this.vel[1] > 0) {
      this.vel[1] = 0;
    } else {
      this.allObjects().forEach(function (obj) {
        obj.input(move[1], Game.STEP_VERT);
      });
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


})();
