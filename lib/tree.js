(function () {
  if (typeof Ski === "undefined") {
    window.Ski = {};
  }

  var Tree = Ski.Tree = function (options) {
    options.height = Tree.HEIGHT;
    options.width = Tree.WIDTH;
    options.color = options.color || "#008000";
    Ski.MovingObject.call(this, options);
  };

  Tree.HEIGHT = 25;
  Tree.WIDTH = 8;

  Ski.Util.inherits(Tree, Ski.MovingObject);

})();
