(function () {
  if (typeof Ski === "undefined") {
    window.Ski = {};
  }

  var Bullet = Ski.Bullet = function (options) {
    options.radius = Bullet.RADIUS;
    options.color = options.color;

    Ski.MovingObject.call(this, options);
  };

  Bullet.RADIUS = 2;
  Bullet.SPEED = 15;

  Ski.Util.inherits(Bullet, Ski.MovingObject);

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Ski.Asteroid) {
      this.remove();
      otherObject.remove();
    }
  };

  Bullet.prototype.isWrappable = false;
})();
