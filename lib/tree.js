(function () {
  if (typeof Ski === "undefined") {
    window.Ski = {};
  }

  var Tree = Ski.Tree = function (options) {
    options.pos = options.pos;
    options.vel = options.vel || [0, -10];
    options.height = Tree.HEIGHT;
    options.width = Tree.WIDTH;
    options.color = options.color || "#008000";


    Ski.MovingObject.call(this, options);
  };

  Tree.HEIGHT = 25;
  Tree.WIDTH = 5;

  Ski.Util.inherits(Tree, Ski.MovingObject);

  // Tree.prototype.collided = function (otherObject) {
  //   this.setTimeout(function () {
  //     otherObject.relocate();
  //   }, 1000);
  // };

  Tree.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  };

  // Tree.prototype.isWrappable = false;
})();
