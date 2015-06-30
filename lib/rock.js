(function () {
  if (typeof Ski === "undefined") {
    window.Ski = {};
  }

  var Rock = Ski.Rock = function (options) {
    var size = this.randomSize(Rock.MAX_SIZE, Rock.MIN_SIZE);
    options.height = size;
    options.width = size;
    options.color = options.color || "#404040";
    Ski.MovingObject.call(this, options);
  };

  Rock.MAX_SIZE = 25;
  Rock.MIN_SIZE = 10;

  Ski.Util.inherits(Rock, Ski.MovingObject);

  Rock.prototype.randomSize = function (max, min) {
    return (Math.floor(
      Math.random() * (max - min)
    ) + min);
  };

  Rock.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0] + this.width / 2,
      this.pos[1] + this.height / 2,
      this.width / 2, 0, 2 * Math.PI, true
    );
    ctx.fill();


  };

})();
