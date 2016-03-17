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

    router.get("/guias", function(req, res) {
        var token = req.headers['x-access-token'];
        
        validarToken(token,connection,function(resultado){
           if(resultado) {
                var query = "SELECT * FROM ??";
                var table = ["guia"];
                query = mysql.format(query,table);
                connection.query(query,function(err,rows){
                    if(err) {
                        res.json({"Error" : true, "Message" : "Error executing MySQL query",
                            "Error: ": err});
                    } else {
                        res.json({"Error" : false, "Message" : "Success", "Guias" : rows});
                    }
                });
            } else {
                res.json({"Error" : true, "Message" : "ERROR: Token invalido"});
            }  
        });
    });

    router.get("/guias/:id", function(req, res) {
        var token = req.headers['x-access-token'];
        
        validarToken(token,connection,function(resultado){
           if(resultado) {
                var query = "SELECT * FROM guia WHERE id=?";
                var table = [req.params.id];
                query = mysql.format(query,table);
                connection.query(query,function(err,rows){
                    if(err) {
                        res.json({"Error" : true, "Message" : "Error executing MySQL query",
                            "Error: ": err});
                    } else {
                        res.json({"Error" : false, "Message" : "Success", "Guias" : rows});
                    }
                });
            } else {
                res.json({"Error" : true, "Message" : "ERROR: Token invalido"});
            }   
        });
    });

    router.post("/guias",function(req,res){
        var token = req.headers['x-access-token'];
        console.log(req.body)
        validarToken(token,connection,function(resultado){
            if(resultado) {
                var query = "INSERT INTO guia(nombre, apellidos, dni, email, telefono, fecha_nac, ciudad) VALUES (?,?,?,?,?,?,?)";
                var table = [req.body.nombre,
                             req.body.apellidos,
                             req.body.dni,
                             req.body.email,
                             req.body.telefono,
                             req.body.fecha_nac,
                             req.body.ciudad];
                query = mysql.format(query,table);
                connection.query(query,function(err,rows){
                    if(err) {
                        console.log("Erorrrrrrrrr\n\n\n")
                        res.json({"Error" : true, 
                            "Message" : "ERROR: Este guia ya existe en la BD:"+req.body.id,
                            "Error: ": err});
                    } else {
                        onsole.log("bieeeee\n\n\n")
                        res.json({"Error" : false, "Message" : "Guia insertado correctamente."});
                    }
                });
            } else {
                 res.json({"Error" : true, "Message" : "ERROR: Token invalido"});
            }
        });
    });


    router.put("/guias",function(req,res){
        var token = req.headers['x-access-token'];
        
        validarToken(token,connection,function(resultado){
           if(resultado) {
                var query = "UPDATE guia SET nombre=?, apellidos=?, dni=?, email=?, telefono=?, fecha_nac=?, ciudad=? WHERE id =?";
                var table = [req.body.nombre,
                             req.body.apellidos,
                             req.body.dni,
                             req.body.email,
                             req.body.telefono,
                             req.body.fecha_nac,
                             req.body.ciudad,
                             req.body.id];
                query = mysql.format(query,table);
                connection.query(query,function(err,rows){
                    if(err) {
                        res.json({"Error" : true, 
                            "Message" : "Error executing MySQL query",
                            "Error: ": err});
                    } else {
                        res.json({"Error" : false, "Message" : "Guia modificado correctamente."});
                    }
                });
            }else {
                res.json({"Error" : true, "Message" : "ERROR: Token invalido"});
            }
        });
    });

    router.delete("/guias/:id",function(req,res){
        var token = req.headers['x-access-token'];
        
        validarToken(token,connection,function(resultado){
           if(resultado) {
                var query = "DELETE from ?? WHERE ??=?";
                var table = ["guia","id",req.params.id];
                query = mysql.format(query,table);
                connection.query(query,function(err,rows){
                    if(err) {
                        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                    } else {
                        res.json({"Error" : false, "Message" : "Eliminado de la BD guias: "+req.params.id});
                    }
                });
            }else {
                res.json({"Error" : true, "Message" : "ERROR: Token invalido"});
            }
        });
    });

}
module.exports = REST_ROUTER;