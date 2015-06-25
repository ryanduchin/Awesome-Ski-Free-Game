(function () {
  if (typeof Ski === "undefined") {
    window.Ski = {};
  }

  var Tree = Ski.Tree = function (options) {
    // debugger;
    options.pos = options.pos;
    options.vel = options.vel || [0, 10];
    options.height = options.height;
    options.width = options.width;
    options.color = options.color || "#008000";


    Ski.MovingObject.call(this, options);
  };

  Tree.height = 5;
  Tree.width = 2;
  // Tree.SPEED = 0;

  Ski.Util.inherits(Tree, Ski.MovingObject);

  Tree.prototype.collided = function (otherObject) {
    // if (otherObject instanceof Ski.Asteroid) {
    //   //restart game
    // }
    Ski.GameView.stop();
  };

  Tree.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  };

  // Tree.prototype.isWrappable = false;
})();
