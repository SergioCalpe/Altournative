var mysql   = require("mysql");
var jwt     = require("jwt-simple");

// Ruta para Autenticacion
var secreto = 'altournativesecret';

// Funcion para validar token
var validarToken = function(token, connection, next) {
    var decoded = jwt.decode(token, secreto);
    var query = "SELECT id, login, password FROM usuario WHERE login=?";
    var table = [decoded.login];
    query = mysql.format(query,table);
    connection.query(query,function(err,row){
        if(err) {
            return next(err);
        } else {
            var resultado = row;
            if(resultado.length > 0) {
                return next(resultado[0].login == decoded.login);
                
            } else {
                return next(false);
            }
        }
    });
}

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes = function(router,connection,md5) {
    var self = this;

    router.get("/rutas", function(req, res) {
        var token = req.headers['x-access-token'];
        
        validarToken(token,connection,function(resultado){
           if(resultado) {
                var query = "SELECT * FROM ??";
                var table = ["ruta"];
                query = mysql.format(query,table);
                connection.query(query,function(err,rows){
                    if(err) {
                        res.json({"Error" : true, "Message" : "Error executing MySQL query",
                            "Error: ": err});
                    } else {
                        res.json({"Error" : false, "Message" : "Success", "Rutas" : rows});
                    }
                });
            } else {
                res.json({"Error" : true, "Message" : "ERROR: Token invalido"});
            }  
        });
    });


    router.get("/rutas/:id", function(req, res) {
        var token = req.headers['x-access-token'];
        
        validarToken(token,connection,function(resultado){
           if(resultado) {
                var query = "SELECT * FROM ruta WHERE id=?";
                var table = [req.params.id];
                query = mysql.format(query,table);
                connection.query(query,function(err,rows){
                    if(err) {
                        res.json({"Error" : true, "Message" : "Error executing MySQL query",
                            "Error: ": err});
                    } else {
                        res.json({"Error" : false, "Message" : "Success", "Rutas" : rows});
                    }
                });
            } else {
                res.json({"Error" : true, "Message" : "ERROR: Token invalido"});
            }   
        });
    });

    router.post("/rutas",function(req,res){
        var token = req.headers['x-access-token'];

        validarToken(token,connection,function(resultado){
            if(resultado) {
                var query = "INSERT INTO ruta(nombre, distancia, duracion, ciudad) VALUES (?,?,?,?)";
                var table = [req.body.nombre,
                             req.body.distancia,
                             req.body.duracion,
                             req.body.ciudad];
                query = mysql.format(query,table);
                connection.query(query,function(err,rows){
                    if(err) {
                        res.json({"Error" : true, 
                            "Message" : "ERROR: Este ruta ya existe en la BD:"+req.body.id,
                            "Error: ": err});
                    } else {
                        res.json({"Error" : false, "Message" : "Ruta insertada correctamente."});
                    }
                });
            } else {
                 res.json({"Error" : true, "Message" : "ERROR: Token invalido"});
            }
        });
    });

    router.put("/rutas",function(req,res){
        var token = req.headers['x-access-token'];
        
        validarToken(token,connection,function(resultado){
           if(resultado) {
                var query = "UPDATE ruta SET nombre=?, distancia=?, duracion=?, ciudad=? WHERE id =?";
                var table = [req.body.nombre,
                             req.body.distancia,
                             req.body.duracion,
                             req.body.ciudad,
                             req.body.id];
                query = mysql.format(query,table);
                connection.query(query,function(err,rows){
                    if(err) {
                        res.json({"Error" : true, 
                            "Message" : "Error executing MySQL query",
                            "Error: ": err});
                    } else {
                        res.json({"Error" : false, "Message" : "Ruta modificada correctamente."});
                    }
                });
            }else {
                res.json({"Error" : true, "Message" : "ERROR: Token invalido"});
            }
        });
    });
    
    router.delete("/rutas/:id",function(req,res){
        var token = req.headers['x-access-token'];
        
        validarToken(token,connection,function(resultado){
           if(resultado) {
                var query = "DELETE from ?? WHERE ??=?";
                var table = ["ruta","id",req.params.id];
                query = mysql.format(query,table);
                connection.query(query,function(err,rows){
                    if(err) {
                        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                    } else {
                        res.json({"Error" : false, "Message" : "Eliminado de la BD rutas: "+req.params.id});
                    }
                });
            }else {
                res.json({"Error" : true, "Message" : "ERROR: Token invalido"});
            }
        });
    });    




}
module.exports = REST_ROUTER;