var mysql   = require("mysql");
var jwt 	= require("jwt-simple");

// Ruta para Autenticacion
var secreto = 'altournativesecret';

// Funcion para crear un token
function crearToken(login, id) {
  var payload = {
    login: login,
    id: id
  }
  return jwt.encode(payload, secreto);
}

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}


REST_ROUTER.prototype.handleRoutes = function(router,connection,md5) {
    var self = this;

    router.post("/login", function(req, res) {
    	var query = "SELECT id, login, password FROM usuario WHERE login=?";
        var table = [req.body.login];
        query = mysql.format(query,table);
        connection.query(query,function(err,row){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query",
                	"Error: ": err});
            } else {
            	if(row.length==0) {
            		res.json({"Error" : true, "Message" : "ERROR: No existen usuarios con este login:" + req.body.login});
            	}
            	if(row[0].password==md5(req.body.password)){
                    res.json({"Error" : true, "Message" : "Success", "token":crearToken(req.body.login, row[0].id)});
            	} else {
            		res.json({"Error" : true, "Message" : "ERROR: Contraseña invalida."});
            	}
                
            }
        });
    });
}


module.exports = REST_ROUTER;