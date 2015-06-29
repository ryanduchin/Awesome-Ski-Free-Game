(function () {
  if (typeof Ski === "undefined") {
    window.Ski = {};
  }

  var GameView = Ski.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.skier = this.game.skier;
    this.timerId = null;
  };

  GameView.MOVES = {
    down: [ 0, -1],
    left: [-1,  0],
    up: [ 0,  1],
    right: [ 1,  0],
  };

  GameView.prototype.bindKeyHandlers = function () {
    var game = this.game;

    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function () { game.input(move); });
    });

    key("space", function () { game.skier.jump() });
    key("f", function () { game.fastModeToggle() });
  };

  GameView.prototype.start = function () {
    var gameView = this;
    this.timerId = setInterval(
      function () {
        gameView.game.step();
        gameView.game.draw(gameView.ctx);
      }, 1000 / Ski.Game.FPS
    );

    this.bindKeyHandlers();
  };

  GameView.prototype.stop = function () {
    clearInterval(this.timerId);
  };
})();
