"use strict";

window.APP = {
  circleNumber: 5,
  squareLength: 100.0,
  zoomFactor: 1,
  circleRadius: 50.0,
  circles: [],
  stage: null,

  init: function () {
    APP.circles = [];
    APP.stage = new createjs.Stage("game-canvas");
    APP.stage.removeAllChildren();
    var shape = new createjs.Shape();
    shape.graphics
      .setStrokeStyle(2)
      .beginStroke("black")
      .drawRect(100, 100, 500, 500);
    APP.stage.addChild(shape);
    APP.stage.autoClear = true;

    APP.updateDisplay();
    APP.initEvent();
    APP.updateCanvas();
    APP.updateCircle();
  },

  updateDisplay: function () {
    $("#circleNumber").text(APP.circleNumber);
    $("#circleNumberRange").val(APP.circleNumber);

    $("#circleRadius").text(APP.circleRadius/500);
    $("#circleRadiusRange").val(APP.circleRadius);
  },

  initEvent: function () {
    $("#circleNumberRange").change(function () {
      console.log("self.circleNumber", APP.circleNumber);
      APP.circleNumber = parseInt($(this).val());
      $("#circleNumber").text(APP.circleNumber);

      APP.updateCanvas();
      APP.updateCircle();
    });

    $("#circleRadiusRange").change(function () {
      console.log("self.circleRadius", APP.circleRadius);
      APP.circleRadius = parseFloat($(this).val());
      $("#circleRadius").text(APP.circleRadius/500);
      APP.updateCircle();
    });

    $("#preset7").click(function () {
      APP.circleNumber = 7;
      APP.circleRadius = 85;
      APP.updateDisplay();
      APP.updateCanvas();
      APP.updateCircle();
    });

    $("#preset10").click(function () {
      APP.circleNumber = 10;
      APP.circleRadius = 73;
      APP.updateDisplay();
      APP.updateCanvas();
      APP.updateCircle();
    });

    $("#preset11").click(function () {
      APP.circleNumber = 11;
      APP.circleRadius = 70;
      APP.updateDisplay();
      APP.updateCanvas();
      APP.updateCircle();
    });
  },

  addCircle: function () {
    var circle = new createjs.Shape();
    circle.graphics
      .setStrokeStyle(1)
      .beginStroke("black")
      .beginFill("DeepSkyBlue")
      .drawCircle(0, 0, APP.circleRadius);
    circle.x = 50 + (APP.circles.length % 5) * 120;
    circle.y = 50 + Math.floor(APP.circles.length / 5) * 120;
    circle.on("pressmove", APP.dragCircle);
    APP.circles.push(circle);
  },

  removeCircle: function () {
    var last = APP.circles.length - 1;
    APP.stage.removeChild(APP.circles[last]);
    APP.circles.pop();
  },

  validCircle: function (index) {
    // in square
    var c = APP.circles[index];
    var r = APP.circleRadius;
    if (c.x - r < 100 || c.x + r > 600) return false;
    if (c.y - r < 100 || c.y + r > 600) return false;

    // overlap
    for (var i = 0; i < APP.circleNumber; ++i) {
      if (i == index) continue;
      var c2 = APP.circles[i];
      if ((c2.x - c.x) * (c2.x - c.x) + (c2.y - c.y) * (c2.y - c.y) < 4 * r * r) {
        return false;
      }
    }
    return true;
  },

  updateCircle: function () {
    for (var i = 0; i < APP.circleNumber; ++i) {
      var color = APP.validCircle(i) ? "DeepSkyBlue" : "Crimson";
      APP.circles[i].graphics
        .clear()
        .drawCircle(0, 0, APP.circleRadius)
        .setStrokeStyle(1)
        .beginStroke("black")
        .beginFill(color)
        .drawCircle(0, 0, APP.circleRadius);
    }
    APP.stage.update();
  },

  dragCircle: function (evt) {
    console.log(evt)
    evt.target.x += evt.nativeEvent.movementX;
    evt.target.y += evt.nativeEvent.movementY;
    APP.updateCircle();
  },
  updateCanvas: function () {
    while (APP.circleNumber > APP.circles.length) {
      APP.addCircle();
    }
    while (APP.circleNumber < APP.circles.length) {
      APP.removeCircle();
    }
    APP.circles.map((c) => {
      APP.stage.addChild(c);
    });
    console.log("self.circleRadius", APP.circleRadius);
    APP.stage.update();
  },
};

$(document).ready(function () {
  console.log("ready!");
  APP.init();
});
