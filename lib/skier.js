(function () {
  if (typeof Ski === "undefined") {
    window.Ski = {};
  }

  var Skier = Ski.Skier = function (options) {
    this.lives = options.lives;
    options.height = Skier.HEIGHT;
    options.width = Skier.WIDTH;
    Ski.MovingObject.call(this, options);
    this.jumping = false;
  };

  Skier.HEIGHT = 40;
  Skier.WIDTH = 20;
  Skier.AIR_FACTOR = -60;
  Skier.JUMP_POINTS = 10;

  Ski.Util.inherits(Skier, Ski.MovingObject);

  Skier.prototype.move = function (vel_horiz) {
    this.pos[0] += vel_horiz;
  };

  Skier.prototype.draw = function (ctx) {
    // stretch on skiing.png gives players a buffer to prevent frustrating collisions
    // stretch on jumping.png to prevent image squashing
    image = new Image();
    if (this.jumping) {
      image.src = 'images/jumping.png';
      var stretch = 6;
    } else {
      image.src = 'images/skiing.png';
      var stretch = 3;
    }
    ctx.drawImage(
      image,
      this.pos[0] - stretch,
      this.pos[1],
      this.width + (stretch * 2),
      this.height
    );
  };

  Skier.prototype.jump = function () {
    this.game.points += Skier.JUMP_POINTS;
    this.jumping = true;
    window.setTimeout(function () {
      this.jumping = false;
    }.bind(this), this.airtime());
  };

  Skier.prototype.airtime = function () {
    var time = this.game.vel[1] * Skier.AIR_FACTOR;
    time += 100;
    if (time > 1500) { time = 1500; }
    return time
  };

})();
