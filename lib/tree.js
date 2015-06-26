(function () {
  if (typeof Ski === "undefined") {
    window.Ski = {};
  }

  var Tree = Ski.Tree = function (options) {
    var size = this.randomSize(Tree.MAX_SIZE, Tree.MIN_SIZE);
    var dim = this.randomSize(Tree.MAX_DIM, Tree.MIN_DIM);
    options.height = size;
    options.width = size * dim;
    options.color = options.color || "#008000";
    Ski.MovingObject.call(this, options);
  };

  Tree.MAX_SIZE = 55;
  Tree.MIN_SIZE = 15;
  Tree.MAX_DIM = 1.3;
  Tree.MIN_DIM = 0.5;

  Ski.Util.inherits(Tree, Ski.MovingObject);

  Tree.prototype.randomSize = function (max, min) {
    return (Math.floor(
      Math.random() * (max - min)
    ) + min);
  };

})();
