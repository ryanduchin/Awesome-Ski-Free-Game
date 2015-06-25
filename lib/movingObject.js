(function () {
  if (typeof Ski === "undefined") {
    window.Ski = {};
  }

  var MovingObject = Ski.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.height = options.height;
    this.width = options.width;
    this.color = options.color;
    this.game = options.game;
  };

  MovingObject.prototype.collided = function () {
    ; // default do nothing
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var pos_diff = Ski.Util.pos_diff(this.pos, otherObject.pos);
    x_dist = pos_diff[0];
    y_dist = pos_diff[1];
    return (x_dist < ((this.width / 2) + (otherObject.width / 2)) &&
            y_dist < ((this.height / 2) + (otherObject.height / 2)))
    // var centerDist = Ski.Util.dist(this.pos, otherObject.pos);
    // return centerDist < ((this.height / 2) + (otherObject.height / 2));
  };

  // MovingObject.prototype.isWrappable = true;

  MovingObject.prototype.move = function () {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];

    if (this.game.isOutOfBounds(this.pos)) {
      this.remove();
    }
  };

  MovingObject.prototype.remove = function () {
    this.game.remove(this);
  };
})();
