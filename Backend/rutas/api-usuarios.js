var mysql   = require("mysql");

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes = function(router,connection,md5) {
    var self = this;

    router.get("/usuarios", function(req, res) {
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
            connection.release();
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
                	"Message" : "Error executing MySQL query",
                	"Error: ": err});
            } else {
                res.json({"Error" : false, "Message" : "Usuario insertado correctamente."});
            }
        });
    });

     router.put("/usuarios",function(req,res){
        var query = "INSERT INTO usuario(nombre, apellidos, dni, telefono, email, login, password) VALUES (?,?,?,?,?,?,?)";
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