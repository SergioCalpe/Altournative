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

    router.get("/pais", function(req, res) {
        var token = req.headers['x-access-token'];
        
        validarToken(token,connection,function(resultado){
           if(resultado) {
                var query = "SELECT * FROM ??";
                var table = ["pais"];
                query = mysql.format(query,table);
                connection.query(query,function(err,rows){
                    if(err) {
                        res.json({"Error" : true, "Message" : "Error executing MySQL query",
                            "Error: ": err});
                    } else {
                        res.json({"Error" : false, "Message" : "Success", "Paises" : rows});
                    }
                });
            } else {
                res.json({"Error" : true, "Message" : "ERROR: Token invalido"});
            }  
        });
    });

    router.get("/pais/:nombre", function(req, res) {
        var token = req.headers['x-access-token'];
        
        validarToken(token,connection,function(resultado){
           if(resultado) {
                var query = "SELECT * FROM pais WHERE nombre=?";
                var table = [req.params.nombre];
                query = mysql.format(query,table);
                connection.query(query,function(err,rows){
                    if(err) {
                        res.json({"Error" : true, "Message" : "Error executing MySQL query",
                            "Error: ": err});
                    } else {
                        res.json({"Error" : false, "Message" : "Success", "Paises" : rows});
                    }
                });
            } else {
                res.json({"Error" : true, "Message" : "ERROR: Token invalido"});
            }   
        });
    });

    router.post("/pais",function(req,res){
        var token = req.headers['x-access-token'];

        validarToken(token,connection,function(resultado){
            if(resultado) {
                var query = "INSERT INTO pais(nombre) VALUES (?)";
                var table = [req.body.nombre];
                query = mysql.format(query,table);
                connection.query(query,function(err,rows){
                    if(err) {
                        res.json({"Error" : true, 
                            "Message" : "ERROR: Este guia ya existe en la BD:"+req.body.nombre,
                            "Error: ": err});
                    } else {
                        res.json({"Error" : false, "Message" : "pais insertado correctamente."});
                    }
                });
            } else {
                 res.json({"Error" : true, "Message" : "ERROR: Token invalido"});
            }
        });
    });

    router.put("/pais",function(req,res){
        var token = req.headers['x-access-token'];
        
        validarToken(token,connection,function(resultado){
           if(resultado) {
                var query = "UPDATE rutas SET nombre=? WHERE nombre =?";
                var table = [req.body.nombre,
                             req.body.nombre];
                query = mysql.format(query,table);
                connection.query(query,function(err,rows){
                    if(err) {
                        res.json({"Error" : true, 
                            "Message" : "Error executing MySQL query",
                            "Error: ": err});
                    } else {
                        res.json({"Error" : false, "Message" : "Pais modificado correctamente."});
                    }
                });
            }else {
                res.json({"Error" : true, "Message" : "ERROR: Token invalido"});
            }
        });
    });

    router.delete("/pais/:nombre",function(req,res){
        var token = req.headers['x-access-token'];
        
        validarToken(token,connection,function(resultado){
           if(resultado) {
                var query = "DELETE from ?? WHERE ??=?";
                var table = ["pais","nombre",req.params.nombre];
                query = mysql.format(query,table);
                connection.query(query,function(err,rows){
                    if(err) {
                        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                    } else {
                        res.json({"Error" : false, "Message" : "Eliminado de la BD pais: "+req.params.nombre});
                    }
                });
            }else {
                res.json({"Error" : true, "Message" : "ERROR: Token invalido"});
            }
        });
    });

}
module.exports = REST_ROUTER;