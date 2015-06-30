(function () {
  if (typeof Ski === "undefined") {
    window.Ski = {};
  }

  var Snowman = Ski.Snowman = function (options) {
    options.height = Snowman.HEIGHT;
    options.width = Snowman.WIDTH;
    Ski.MovingObject.call(this, options);
    this.collided = false;
  };

  Snowman.HEIGHT = 60;
  Snowman.WIDTH = 50;
  Snowman.STEP = 5;

  Ski.Util.inherits(Snowman, Ski.MovingObject);

  Snowman.prototype.move = function (vel_vert) {
    if (this.collided) { return; }
    if (this.game.skier.pos[0] > this.pos[0]) {
      this.pos[0] += Snowman.STEP;
      this.pos[1] += vel_vert;
    } else {
      this.pos[1] += Snowman.STEP;
    }
  };


  Snowman.prototype.draw = function (ctx) {
    // ctx.fillStyle = "#000000";
    // ctx.fillRect(
    //   this.pos[0],
    //   this.pos[1] - 1,
    //   this.width,
    //   this.height + 2
    // );
    image = new Image();
    image.src = 'images/snowman.png';
    ctx.drawImage(
      image,
      this.pos[0],
      this.pos[1],
      this.width,
      this.height
    );
  };

})();
