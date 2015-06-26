(function () {
  if (typeof Ski === "undefined") {
    window.Ski = {};
  }

  var Tree = Ski.Tree = function (options) {
    var size = this.randomSize(Tree.MAX_SIZE, Tree.MIN_SIZE);
    var dim = this.randomSize(Tree.MAX_DIM, Tree.MIN_DIM);
    options.height = size;
    options.width = size * dim;
    // options.color = options.color || "#008000";
    Ski.MovingObject.call(this, options);
  };

  Tree.MAX_SIZE = 55;
  Tree.MIN_SIZE = 20;
  Tree.MAX_DIM = 1.5;
  Tree.MIN_DIM = 0.4;
  Tree.TRUNK_COLOR = "#8B4513";
  Tree.LEAF_COLOR = "#008000";

  Ski.Util.inherits(Tree, Ski.MovingObject);

  Tree.prototype.randomSize = function (max, min) {
    return (Math.floor(
      Math.random() * (max - min)
    ) + min);
  };

  Tree.prototype.draw = function (ctx) {
    this.drawTrunk(ctx);
    this.drawLeaves(ctx);
  };

  Tree.prototype.drawTrunk = function (ctx) {
    ctx.fillStyle = Tree.TRUNK_COLOR;
    ctx.fillRect(
      this.pos[0] + (this.width / 3),
      this.pos[1] + this.height,
      (this.width / 3),
      (this.height / -4)
    );
  };

  Tree.prototype.drawLeaves = function (ctx) {
    ctx.fillStyle = Tree.LEAF_COLOR;

    ctx.beginPath();
    ctx.moveTo(
      this.pos[0],
      this.pos[1] + (this.height * 3 / 4)
    );
    ctx.lineTo(
      this.pos[0] + this.width,
      this.pos[1] + (this.height * 3 / 4)
    );
    ctx.lineTo(
      this.pos[0] + (this.width / 2),
      this.pos[1] + (this.height * 1 / 4)
    );
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(
      this.pos[0],
      this.pos[1] + (this.height / 2)
    );
    ctx.lineTo(
      this.pos[0] + this.width,
      this.pos[1] + (this.height / 2)
    );
    ctx.lineTo(
      this.pos[0] + (this.width / 2),
      this.pos[1]
    );
    ctx.closePath();
    ctx.fill();
  };


})();
