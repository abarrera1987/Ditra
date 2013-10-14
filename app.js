/*hola a migos
/**
 * Module dependencies.
 */
 
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var models = require('./models');
models.createSchema(mongoose);

var fs = require('fs');
var async = require('async');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: 'hola' }));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/', routes.index);
app.post('/', routes.index);
app.get('/users', user.list);
app.get('/registro', routes.registro);
app.post("/registro/add", function(req,res){
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var dia = req.body.dia;
  var mes = req.body.mes;
  var año = req.body.año;
  var sexo = req.body.sexo;
  var cedula = req.body.cedula;
	var telefono = req.body.telefono;
	var email = req.body.correo;
  var nick = req.body.nick;
  var contraseña = req.body.contraseña;
     new Usuario({
        nombre: nombre,
        apellido: apellido,
        dia: dia,
        mes: mes,
        año: año,
        sexo: sexo,
        cedula: cedula,
        telefono: telefono,
        correo: email,
        nick: nick,
        contraseña: contraseña,
      }).save(function(err,docs){
      if(err) res.send("error");
      res.send(docs);      
   });   
   res.redirect('/registro'); 
  });
 
app.get('/buscar', routes.buscar);
app.post('/usuarioli', function(req, res){
Usuario.findOne({cedula: req.body.cedula }).sort({cedula:"descending"})
          .skip(0).limit(1).execFind(function(err,docs){
      if(err) res.send(err);
      res.render("usuarioli",{usuarios: docs});
  });
});
app.get("/login", routes.login);
app.post("/index", function(req, res){
 Usuario.findOne({nick: req.body.nicks, contraseña: req.body.contraseñas } ,function (err, Usuario) {
    //Se verifica si encontro algun usuario 
    if (Usuario == null) {
      //como no encontro ningun usuario re direcciona a login con un mensaje 
      res.render('/login2',{mensaje: "La contraseña y el usuario que introdujiste no coinciden."});
    } else{
      
       
    } 
  });
 res.render('index'); 
});
app.get("/login2", routes.login2);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
