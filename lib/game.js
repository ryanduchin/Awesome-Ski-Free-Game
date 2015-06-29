(function () {
  if (typeof Ski === "undefined") {
    window.Ski = {};
  }

  var Game = Ski.Game = function () {
    this.collided = false;
    this.initialize();
  };

  Game.BG_COLOR = "#F5F5F5";
  Game.DIM_X = 1200;
  Game.DIM_Y = 600;
  Game.FPS = 32;

  Game.NUM_Trees = 15;
  Game.NUM_Rocks = 10;

  Game.FRICTION_SIDE = 1.1;
  Game.FRICTION_UP = 1.6;
  Game.FRICTION_DOWN = 1.004;

  Game.LOSE_LIFE_POINTS = 3000;
  Game.JUMP_ROCK_POINTS = 1000;

  Game.prototype.initialize = function () {
    this.trees = [];
    this.rocks = [];
    this.skier = new Ski.Skier({
      pos: [Game.DIM_X * 1/2, Game.DIM_Y * 4/10],
      game: this,
      lives: 3
    });
    this.addTrees();
    this.addRocks();
    this.vel = [0, 0];
    this.points = 0;
    this.preventCollisions();
    this.speedFactor = 1;
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
    this.checkOutOfBounds();
  };

  Game.prototype.input = function (move) {
    this.vel[0] += move[0];
    this.vel[1] += move[1];
    if (this.vel[1] > 0) {
      this.vel[1] = 0;
    }
  };

  Game.prototype.add = function (object) {
    if (object instanceof Ski.Tree) {
      this.trees.push(object);
    } else if (object instanceof Ski.Rock) {
      this.rocks.push(object);
    } else {
      throw "invalid object";
    }
  };

  Game.prototype.addRocks = function () {
    for (var i = 0; i < Game.NUM_Rocks; i++) {
      this.add(new Ski.Rock({
        game: this,
        pos: this.randomPosition()
      }));
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
    return []
      .concat(this.trees)
      .concat(this.rocks);
  };

  Game.prototype.checkCollisions = function () {
    if (this.collided) {return; }
    var game = this;
    this.allObjects().forEach(function (obj) {
      if (obj.isCollidedWith(game.skier)) {
        game.handleCollision(obj);
      }
    });
  };

  Game.prototype.handleCollision = function (object) {
    if (this.skier.jumping && object instanceof Ski.Rock) {
      this.points += Game.JUMP_ROCK_POINTS;
      return;
    }
    this.collided = true;
    var game = this;
    this.vel = [0, 0];
    this.skier.jumping = true;
    window.setTimeout(function () {
      game.skier.pos[1] -= 10;
      game.points -= (Game.LOSE_LIFE_POINTS - 10);
      game.collided = false;
      game.skier.jumping = false;
      game.continueGame();
    }, 1500);
  };

  Game.prototype.continueGame = function () {
    this.skier.lives -= 1;
    if (this.skier.lives < 0) {
      this.initialize();
    }
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.skier.draw(ctx);
    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
    this.drawHeader(ctx);
  };

  Game.prototype.drawHeader = function (ctx) {
    ctx.font = "16px Calibri";
    ctx.fillStyle = 'blue';
    ctx.fillText(this.points, Game.DIM_X * 1/20, Game.DIM_Y * 1/20);

    image = new Image();
    image.src = 'images/skiing.png';
    for (var i = 0; i < this.skier.lives; i++) {
      ctx.drawImage(
        image,
        (Game.DIM_X * 18/20) + ((this.skier.width * .6 + 10) * i),
        Game.DIM_Y * 1/20 - this.skier.height / 4,
        this.skier.width * .6,
        this.skier.height * .6
      );
    }
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
    this.points -= Math.floor(this.vel[1])
    this.skier.move(this.vel[0] * this.speedFactor);
    var game = this;
    this.allObjects().forEach(function (object) {
      object.move(game.vel[1] * game.speedFactor);
    });
    this.adjustGameVel();
  };

  Game.prototype.adjustGameVel = function () {
    this.vel[0] = this.vel[0] / Game.FRICTION_SIDE;
    if (this.vel[1] > 0) {
      this.vel[1] = this.vel[1] / Game.FRICTION_UP;
    } else {
      this.vel[1] = this.vel[1] / Game.FRICTION_DOWN;
    }
  };

  Game.prototype.remove = function (object) {
    if (object instanceof Ski.Tree) {
      this.trees.splice(this.trees.indexOf(object), 1);
      this.add(new Ski.Tree({
        game: this,
        pos: this.randomBottomPosition()
      }));
    } else if (object instanceof Ski.Rock) {
      this.rocks.splice(this.rocks.indexOf(object), 1);
      this.add(new Ski.Rock({
        game: this,
        pos: this.randomBottomPosition()
      }));
    } else {
      throw "invalid remove";
    }
  };

  Game.prototype.preventCollisions = function () {
    var game = this;
    this.allObjects().forEach(function (obj) {
      if (obj.isCollidedWith(game.skier)) {
        obj.pos[0] += game.skier.width + Math.floor(Math.random() * 30);
        obj.pos[1] += game.skier.height + Math.floor(Math.random() * 30);
      }
    });
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

  Game.prototype.fastModeToggle = function () {
    if (this.speedFactor === 1) {
      this.speedFactor = 2.5;
    } else {
      this.speedFactor = 1;
    }
  };

})();
