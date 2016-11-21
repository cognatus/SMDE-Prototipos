var express = require('express');
var http = require('http').createServer(app);
var path = require('path');
var mysql = require('mysql');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var favicon = require('serve-favicon');
var io = require('socket.io')(http);
var app = express();

var cors = require('cors');
app.use(cors());

var vistas = require('./routes/views');
var api = require('./routes/index');
var users = require('./routes/users');

var admin = require('./api/admin');
var agenda = require('./api/agenda');
var perfil = require('./api/perfil');
var asignaturas = require('./api/asignaturas');
var mensajes = require('./api/mensajes');
var foro = require('./api/foro');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

var sess = {
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {}
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//this is like the public stuff
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/icon.png'));

app.use(vistas);
app.use('/api', api);

//variable global para jalar directorios
global.__base = __dirname;

// Conecta a la DB MySQL
var connection = mysql.createConnection({
  multipleStatements: true,
  host: 'localhost',
  password: 'n0m3l0',
  user: 'root',
  database: 'smdedbv1',
  port: 3306
});

//con esto conectas y lo hace de manera asincrona
connection.connect(function(error){
  if(error){
    throw error;
  }else{
    console.log('Conexion correcta.');
  }
});

admin.constructor(connection);
perfil.constructor(connection);
agenda.constructor(connection);
asignaturas.constructor(connection);
mensajes.constructor(connection);
foro.constructor(connection);

/* Chat */
var chatsini = io.of('/chatsini').on('connection', function (socket){

  /*socket.on('join', function(data){
    socket.room = data.id;
    socket.join(data.id);
    console.log('YAY!!! si conecto :D')
  })*/

  //el id que le pasas se lo mandas desde el front, puede ser cualquier cosa
  socket.on('cambiarsala', function(data){
    socket.leave(socket.room);//deja la sala actual
    socket.room = data;//especificas la sala
    socket.join(data);//te unes a la sala
  })

  //Paso 2.
  socket.on('mensaje', function(data){//recibe lo que quieras

    //esta linea dice que va a emitir un evento mostrar en la sala especifica
    socket.to(socket.room).emit('mostrar', {
    //socket.emit('mostrar', {
        //le envias lo que tu quieras
        //Recibes las variables desde el front
        userEmail: data.userEmail,
        userName: data.userName,
        userLastName: data.userLastName,
        userPhoto: data.userPhoto,
        messageText: data.messageText,
        messageTime: data.messageTime
    });

  });

});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
