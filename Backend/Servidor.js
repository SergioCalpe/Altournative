var express = require("express");
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var md5 = require('MD5');
var rest = require("./api-rest.js");
var app  = express();

function REST(){
    var self = this;
    self.connectMysql();
};


REST.prototype.connectMysql = function() {
    var self = this;
    var pool      =    mysql.createPool({
    	acquireTimeout: 30000,
        host     : 'localhost',
        user     : 'admin',
        password : 'admin',
        database : 'Altournative',
        debug	 : true
    });
    pool.getConnection(function(err,connection){
        if(err) {
          self.stop(err);
        } else {
          self.configureExpress(connection);
        }
    });
}

REST.prototype.configureExpress = function(connection) {
      var self = this;
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      var router = express.Router();
      app.use('/altournative', router);
      var rest_router = new rest(router,connection,md5);
      self.startServer();
}

REST.prototype.startServer = function() {
      app.listen(3000,function(){
          console.log("Altournative API - REST escuchando puerto 3000.");
      });
}

REST.prototype.stop = function(err) {
    console.log("ERROR MYSQL. \n" + err);
    process.exit(1);
}

new REST();