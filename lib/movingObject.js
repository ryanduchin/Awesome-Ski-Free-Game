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

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var pos_diff = Ski.Util.pos_diff(this.pos, otherObject.pos);
    x_dist = Math.abs(pos_diff[0]);
    y_dist = Math.abs(pos_diff[1]);
    return (x_dist < ((this.width / 2) + (otherObject.width / 2)) &&
            y_dist < ((this.height / 2) + (otherObject.height / 2)))
  };

  MovingObject.prototype.move = function (vel_vert) {
    this.pos[1] += vel_vert;
  };


  MovingObject.prototype.remove = function () {
    this.game.remove(this);
  };

})();
