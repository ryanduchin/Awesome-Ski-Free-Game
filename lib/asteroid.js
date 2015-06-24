(function () {
  if (typeof Ski === "undefined") {
    window.Ski = {};
  }

  var Asteroid = Ski.Asteroid = function (options) {
    options.color = Asteroid.COLOR;
    options.pos = options.pos || options.game.randomPosition();
    options.radius = Asteroid.RADIUS;
    options.vel = options.vel || Ski.Util.randomVec(Asteroid.SPEED);

    Ski.MovingObject.call(this, options);
  };

  Asteroid.COLOR = "#505050";
  Asteroid.RADIUS = 25;
  Asteroid.SPEED = 4;

  Ski.Util.inherits(Asteroid, Ski.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Ski.Ship) {
      otherObject.relocate();
    }
  };
})();
