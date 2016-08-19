Module.register("canvas", {
  defaults: {
    var mousePressed = false;
    var lastX, lastY;
    var ctx;

  },

  getScripts: function() {
    return ["modules/canvas/js/jquery.js"];
  },

  getStyles: function()
  {
    return ["canvas.css"];
  },

  start: function() {
    Log.info("Starting module: " + this.name);
  }
  getDom: function() {
    var topDiv = document.createElement("div");
    $('topDiv').attr('id','topDiv');
    var myCanvas = topDiv.createElement("canvas");
    $('myCanvas').attr('id', 'myCanvas');
    var selColor = topDiv.createElement("select");
    $('selColor').attr('id', 'selColor');
    $('#selColor').val('black');
    $('#selColor').val('blue');
    $('#selColor').val('red');
    $('#selColor').val('green');
    $('#selColor').val('yellow');
    $('#selColor').val('gray');
    var selWidth = topDiv.createElement("select");
    $('selWidth').attr('id', 'selWidth');
    $('#selWidth').val(1);
    $('#selWidth').val(3);
    $('#selWidth').val(7);
    $('#selWidth').val(9);
    $('#selWidth').val(11);
    var button = topDiv.createElement("button");
    $('button').click(function() {
      clearArea();
      return false;
    });


    function InitThis() {
      ctx = document.getElementById('myCanvas').getContext("2d");

      $('#myCanvas').mousedown(function(e) {
        mousePressed = true;
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
      });
      $('#myCanvas').mousemove(function (e) {
        if (mousePressed) {
          Draw(e.pageX - $(this).offset().left, e.pageY-$(this).offset().top, true);
        }
      });
      $('#myCanvas').mouseup(function(e) {
        mousePressed = false;
      });
      $('#myCanvas').mouseleave(function (e) {
        mousePressed = false;
      });
    }
    function Draw(x, y, isDown) {
      if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = $('#selColor').val();
        ctx.lineWidth = $('#selWidth').val();
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
      }
      lastX = x;
      lastY = y;
    }
    function clearArea() {
      ctx.setTransform(1,0,0,1,0,0);
      ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    }

    return canvas;
  }
})
