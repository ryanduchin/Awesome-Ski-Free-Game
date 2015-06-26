(function () {
  if (typeof Ski === "undefined") {
    window.Ski = {};
  }

  var Skier = Ski.Skier = function (options) {
    options.height = Skier.HEIGHT;
    options.width = Skier.WIDTH;
    options.color = options.color || "#DC143C";
    options.vel = options.vel || [0, 0];

    Ski.MovingObject.call(this, options);
  };

  Skier.HEIGHT = 20;
  Skier.WIDTH = 5;
  Skier.STEP = 3;

  Ski.Util.inherits(Skier, Ski.MovingObject);

  Skier.prototype.input = function (move) {
    this.pos[0] += move[0] * Skier.STEP;
    this.pos[1] += move[1] * Skier.STEP;
    this.vel[0] += move[0] * Skier.STEP;
    this.vel[1] += move[1] * Skier.STEP;
  };

  Skier.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.vel[0] = this.vel[0] / 1.01;
    if (this.vel[1] < 0) {
      this.vel[1] = this.vel[1] / 1.4;
    } else {
      this.vel[1] = this.vel[1] / 1.004;
    }
  };

  Skier.prototype.relocate = function () {
    this.pos = [this.game.DIM_X * 1/2, this.game.DIM_Y * 1/10];
    this.vel = [0, 0];
  };


})();



  // function randomColor () {
  //   var hexDigits = "0123456789ABCDEF";
  //
  //   var color = "#";
  //   for (var i = 0; i < 3; i ++) {
  //     color += hexDigits[Math.floor((Math.random() * 16))];
  //   }
  //
  //   return color;
  // }

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
