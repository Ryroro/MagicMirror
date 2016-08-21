var Class = require("../../js/class.js");
var express = require("express");
var path = require("path");

NodeHelper = Class.extend({
  init:function() {
    console.log("Initializing mm-video-player module helper ...");

  },

  start: function() {
    this.expressApp.get('/video',function(req, res) {
      var fs = require('fs');
      var path = require('path');

      var files = [];

      fs.readdir('modules/mm-video-player/video', (err, data) => {
        for(i = 0; i< data.length; i++){
          if(path.extname(data[i]) == ".mp4"){
            files.push(data[i]);
          }
        }
        res.send(files);
      });
    });
  },

  socketNotificationReceived: function(notification, payload) {
    console.log(this.name + "received a socket notification: " + notification + " - Payload: " + payload);

  },

  setName: function(name) {
    this.name = name;
  },

  setPath: function(path) {
    this.path = path;
  },
  sendSocketNotification: function(notification,payload) {
    this.io.of(this.name).emit(notification, payload);
  },

  setExpressApp: function(app) {
    this.exressApp = app;

    var publicPath = this.path + "/public";
    app.use("/" + this.name, express.static(publicPath));
  },

  setSocketIO: function(io) {
    var self = this;
    self.io = io;

    console.log("Connecting socket for: " + this.name);
    var namespace = this.name;
    io.of(namespace).on("connection", function(socket) {
      var onevent = socket.onevent;
      socket.onevent = function(packet) {
        var args = packet.data || [];
        onevent.call(this, packet);
        packet.data = ["*"].concat(args);
        onevent.call(this, packet);
      };
      socket.on("*",function(notification, payload) {
        if (notification !== "*")
        self.socketNotificationReceived(notification, payload);
      });
    });
  }
  });

  NodeHelper.create = function(moduleDefinition) {
    return NodeHelper.extend(moduleDefinition);
  };
module.exports = NodeHelper;
