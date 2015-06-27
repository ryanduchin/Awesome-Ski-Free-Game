(function () {
  if (typeof Ski === "undefined") {
    window.Ski = {};
  }

  var Skier = Ski.Skier = function (options) {
    options.height = Skier.HEIGHT;
    options.width = Skier.WIDTH;
    options.color = options.color || "#DC143C";
    Ski.MovingObject.call(this, options);
    this.jumping = false;
  };

  Skier.HEIGHT = 40;
  Skier.WIDTH = 20;

  Ski.Util.inherits(Skier, Ski.MovingObject);

  Skier.prototype.input = function (move, step) {
    this.pos[0] += move * step;
  };

  Skier.prototype.move = function (vel_horiz) {
    this.pos[0] += vel_horiz;
  };

  Skier.prototype.relocate = function () {
    this.pos = [this.game.DIM_X * 1/2, this.game.DIM_Y * 3/10];
  };

  Skier.prototype.draw = function (ctx) {
    image = new Image();
    if (this.jumping) {
      image.src = 'images/jumping.png';
      var stretch = 5;
    } else {
      image.src = 'images/skiing.png';
      var stretch = 0;
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
    this.jumping = true;
    window.setTimeout(function () {
      this.jumping = false;
    }.bind(this), this.airtime());
  };

  Skier.prototype.airtime = function () {
    var time = this.game.vel[1] * -20
    time += 100;
    if (time > 1500) { time = 1500; }
    return time
  };


})();





  // Skier.prototype.fireBullet = function () {
  //   var norm = Ski.Util.norm(this.vel);
  //
  //   if (norm == 0) {
  //     // Can't fire unless moving.
  //     return;
  //   }
  //
  //   var relVel = Ski.Util.scale(
  //     Ski.Util.dir(this.vel),
  //     Ski.Bullet.SPEED
  //   );
  //
  //   var bulletVel = [
  //     relVel[0] + this.vel[0], relVel[1] + this.vel[1]
  //   ];
  //
  //   var bullet = new Ski.Bullet({
  //     pos: this.pos,
  //     vel: bulletVel,
  //     color: this.color,
  //     game: this.game
  //   });
  //
  //   this.game.add(bullet);
  // };
