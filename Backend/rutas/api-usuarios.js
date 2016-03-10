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
                console.log("JODER: "+resultado[0].login +" / "+decoded.login)
                console.log(resultado[0].login == decoded.login);
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
    

    router.get("/usuarios", function(req, res) {
        var token = req.headers['x-access-token'];
        
        validarToken(token,connection,function(resultado){
           if(resultado) {
            var query = "SELECT * FROM ??";
            var table = ["usuario"];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    res.json({"Error" : true, "Message" : "Error executing MySQL query",
                        "Error: ": err});
                } else {
                    res.json({"Error" : false, "Message" : "Success", "Usuarios" : rows});
                }
            });
            } else {
                res.json({"Error" : true, "Message" : "ERROR: Token invalido"});
            }  
        });
    });

    router.post("/usuarios",function(req,res){
        var query = "INSERT INTO usuario(nombre, apellidos, dni, telefono, email, login, password) VALUES (?,?,?,?,?,?,?)";
        var table = [req.body.nombre,
        			 req.body.apellidos,
        			 req.body.dni,
        			 req.body.telefono,
        			 req.body.email,
        			 req.body.login,
        			 md5(req.body.password)];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, 
                	"Message" : "ERROR: Este login ya existe en la BD:"+req.body.login,
                	"Error: ": err});
            } else {
                res.json({"Error" : false, "Message" : "Usuario insertado correctamente."});
            }
        });
    });

     router.put("/usuarios",function(req,res){
        var query = "UPDATE usuario SET nombre=?, apellidos=?, dni=?, telefono=?, email=?, login=?, password=? WHERE id = ?";
        var table = [req.body.nombre,
                     req.body.apellidos,
                     req.body.dni,
                     req.body.telefono,
                     req.body.email,
                     req.body.login,
                     md5(req.body.password),
                     req.body.id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, 
                    "Message" : "Error executing MySQL query",
                    "Error: ": err});
            } else {
                res.json({"Error" : false, "Message" : "Usuario insertado correctamente."});
            }
        });
    });

    router.delete("/usuarios/:login",function(req,res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["usuario","login",req.params.login];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Eliminado de la BD usuario: "+req.params.login});
            }
        });
    });
}

module.exports = REST_ROUTER;