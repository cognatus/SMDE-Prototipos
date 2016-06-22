
/**
 * Module dependencies.
 */

var express = require('express');
//EXPRESS 4
/*var favicon = require('serve-favicon');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var json = bodyParser.json();
var static = require('serve-static');*/

var app = express();
var http = require('http').createServer(app);
var path = require('path');
var router = express.Router();

var routes = require('./routes');
var post = require('./routes/post');
var calendarPost = require('./routes/calendarPost');
var profilePost = require('./routes/profilePost');
var subjectsPost = require('./routes/subjectsPost');
var messagesPost = require('./routes/messagesPost');
var forumPost = require('./routes/forumPost');
var io = require('socket.io')(http);
/*var session = require('client-sessions');*/
var mysql = require('mysql');
var htmlspecialchars = require('htmlspecialchars');

// all environments
//EXPRESS 4
/*app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/images/smdelogo.png'));
app.use(methodOverride());
app.use(logger('dev'));
app.use(cookieParser('Sabemos todo sobre ti'));
app.use(session({ 
	secret: 'keyboard cat', 
	cookie: { maxAge: 60000 }, 
	resave: true, 
	saveUninitialized: true }));
app.use(bodyParser.json);
app.use(bodyParser.urlencoded);
app.use(static(path.join(__dirname, 'public')));*/
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.methodOverride());
app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + '/public/publications' }));
app.use(express.logger('dev'));
app.use(express.cookieParser('sabemos todo sobre ti'));
app.use(express.session());
app.use(express.json());
app.use(express.urlencoded());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//variable global para jalar directorios
global.__base = __dirname;

/*app.use(session({
}));*/

/**
 * Chat
 */

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
 		/*console.log('YAY!!! si cambio :D');
		console.log('Sala: ' + socket.room);*/
	})

 	//Paso 2.
	socket.on('mensaje', function(data){//recibe lo que quieras

		/*console.log(' ');
		console.log('---------------------------------------------------------------');
		console.log('Sala: ' + socket.room);
		console.log('Mensaje: ' + data.messageText);
		console.log('Hora: ' + data.messageTime);
		console.log('De: ' + data.userEmail);
		console.log('---------------------------------------------------------------');
		console.log(' ');*/

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

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

//conecta a la DB MySQL
function databaseInstance(){
	var connection = mysql.createConnection({
		multipleStatements: true,
		host: 'localhost',
		password: 'n0m3l0',
		user: 'root',
		database: 'smdedbv1',
		port: 3306
	});
	return connection;
};

/**
* Funciones para comprobar el tipo de usuario
*/

	//cualquier sesion
	function login(req, res, next){
		if( req.session.datos ){
			next();
		}else{
			res.render('error' , {
				errorData: {
					errorTitle: 'Inicia Sesión',
					errorItem: ['-  No has iniciado sesión'],
					backUrl: '/login'
				}
			});
		}
	 }

	//sin iniciar sesion
	function loginN(req, res, next){
		if( !req.session.datos ){
			next();
		}else{
			res.redirect('main');
		}
	 }

	//solo alumno y profesor
	function loginS(req, res, next){
		var aux = req.session.datos;
		if( !aux ){
			res.redirect('error');
		}else if( req.session.privilegio == 1 || req.session.privilegio == 2 ){
			next();
		}else{
			res.render('error' , {
				errorData: {
					errorTitle: 'Error con la Sesión',
					errorItem: ['-  No tienes permiso para acceder a esta parte',
					'-  No has iniciado sesión'],
					backUrl: '/login'
				}
			});
		}
	 }

	//solo administrador
	function loginA(req, res, next){
		var aux = req.session.datos;
		if( !aux ){
			res.redirect('error');
		}else if( req.session.privilegio == 3 ){
			next();
		}else{
			res.render('error' , {
				errorData: {
					errorTitle: 'Error',
					errorItem: ['-  No tienes permiso para acceder a esta parte',
					'-  No has iniciado sesión'],
					backUrl: '/login'
				}
			});
		}
	 }

/*Metodos GET*/

app.get('/', loginN, routes.index);
app.get('/login', loginN, routes.login);
app.get('/main', login, routes.main);
app.get('/profile', login, routes.profile);
app.get('/messages', login, routes.messages);
app.get('/contents', loginS, routes.contents);
app.get('/subjects', loginS, routes.subjects);
app.get('/foro', loginS, routes.foro);
app.get('/settings', login, routes.settings);
app.get('/calendar', login, routes.calendar);
app.get('/management', loginA, routes.management);
app.get('/error', routes.error);
app.get('/logout', post.logout);


/*Metodos POST*/
app.post('/login', loginN, post.login);

//Todo lo referente a la gestión
app.post('/insertStudent', post.insertStudent);
app.post('/insertTeacher', post.insertTeacher);
app.post('/insertDept', post.insertDept);
app.post('/insertSubject',post.insertSubject);
app.post('/insertCourse', post.insertCourse);
app.post('/insertSubjectCourse', post.insertSubjectCourse);
app.get('/getAdministratorsDatabase', post.getAdministratorsDatabase);
app.get('/getStudentsDatabase', post.getStudentsDatabase);
app.get('/getTeachersDatabase', post.getTeachersDatabase);
app.get('/getStudentsSubjectsDatabase', post.getStudentsSubjectsDatabase);
app.get('/getTeachersSubjectsDatabase', post.getTeachersSubjectsDatabase);
app.get('/getDepartmentsDatabase', post.getDepartmentsDatabase);
app.get('/getSubjectsDatabase', post.getSubjectsDatabase);
app.get('/getCoursesDatabase', post.getCoursesDatabase);

//Todo referente al perfil
app.post('/setProfileTheme', profilePost.setProfileTheme);
app.post('/setProfileMsmColor', profilePost.setProfileMsmColor);
app.get('/getProfileSubjectsDatabase', profilePost.getProfileSubjectsDatabase);
app.get('/getProfileContactsAdministrators', profilePost.getProfileContactsAdministrators);
app.get('/getProfileContactsStudents', profilePost.getProfileContactsStudents);
app.get('/getProfileContactsTeachers', profilePost.getProfileContactsTeachers);
app.get('/getStudentCoincidences', profilePost.getStudentCoincidences);
app.get('/getTeacherCoincidences', profilePost.getTeacherCoincidences);
app.post('/updateProfilePhotos', profilePost.updateProfilePhotos);

//Todo referente a la agenda
app.post('/insertPublication', calendarPost.insertPublication);
app.post('/insertReminder', calendarPost.insertReminder);
app.get('/getProfileSubjectsDatabaseCalendar', calendarPost.getProfileSubjectsDatabaseCalendar);
app.get('/getRemindersDatabase', calendarPost.getRemindersDatabase);
app.get('/getPublicationsDatabase', calendarPost.getPublicationsDatabase);
app.get('/getPublicationAttachedFiles', calendarPost.getPublicationAttachedFiles);
app.get('/downloadAttachment', calendarPost.downloadAttachment);

//Todo referente a la vista de Asignaturas
app.get('/getSubjectsCoursesDatabase', subjectsPost.getSubjectsCoursesDatabase);
app.post('/insertSubjectsCoursesSelfUser', subjectsPost.insertSubjectsCoursesSelfUser);

//Todo lo referente a la mensajeria
app.post('/insertLobby', messagesPost.insertLobby);
app.post('/insertNewMessage', messagesPost.insertNewMessage);
app.get('/getLobbiesDatabase', messagesPost.getLobbiesDatabase);
app.get('/getSelectedLobbyMessages', messagesPost.getSelectedLobbyMessages);
app.get('/getProfileContactsAdministratorsMsm', messagesPost.getProfileContactsAdministratorsMsm);
app.get('/getProfileContactsStudentsMsm', messagesPost.getProfileContactsStudentsMsm);
app.get('/getProfileContactsTeachersMsm', messagesPost.getProfileContactsTeachersMsm);

//Todo lo referente al foro
app.post('/insertForumTopic', forumPost.insertForumTopic);
app.post('/insertForumTopicComment', forumPost.insertForumTopicComment);
app.post('/insertForumTopicCommentReply', forumPost.insertForumTopicCommentReply);
app.post('/likeForumComment', forumPost.likeForumComment);
app.post('/likeForumCommentReply', forumPost.likeForumCommentReply);
app.get('/getForumTopics', forumPost.getForumTopics);
app.get('/forumtopic/:topicId', forumPost.getForumTopicCommentsCron);
app.get('/getForumTopicCommentReplies', forumPost.getForumTopicCommentReplies);


http.listen(app.get('port'), function(){
	var base = new databaseInstance();
	base.connect(function(error){
		if(error){
			throw error;
		}else{
			console.log('Conexion correcta.');
		}
	});
	post.constructor(databaseInstance);
	profilePost.constructor(databaseInstance);
	calendarPost.constructor(databaseInstance);
	subjectsPost.constructor(databaseInstance);
	messagesPost.constructor(databaseInstance);
	forumPost.constructor(databaseInstance);
	console.log('SMDE server listening on port ' + app.get('port'));
});

/* package.json EXPRESS 4
	"serve-favicon": "*",
    "method-override": "*",
    "errorhandler": "*",
    "body-parser": "*",
    "morgan": "*",
    "cookie-parser": "*",
    "express-session": "*",
    "serve-static": "*",
*/