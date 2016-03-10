var express = require('express');
var app = express();

app.use('/', express.static('web')); // Necesita el directorio web
app.listen(4000, function(){
	console.log("Aplicación Web Express en el puerto 4000");
});
