(function () {
  if (typeof Ski === "undefined") {
    window.Ski = {};
  }

  var Tree = Ski.Tree = function (options) {
    options.height = Tree.height;
    options.width = Tree.width;
    options.color = options.color;

    Ski.MovingObject.call(this, options);
  };

  Tree.height = 5;
  Tree.width = 2;
  Tree.SPEED = 0;

  Ski.Util.inherits(Tree, Ski.MovingObject);

  Tree.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Ski.Asteroid) {
      this.remove();
      otherObject.remove();
    }
  };

  Tree.prototype.isWrappable = false;
})();
