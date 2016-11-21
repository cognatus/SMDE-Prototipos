var express = require('express');
var app = express();
var router = express.Router();

var users = require('./users');
var admin = require('../api/admin');

/* GET views. */

// Catch 404
router.use(function(err, req, res, next) {
	res.status(404);
	res.render('error', { 
		errorData: {
			errorTitle: err.stack,
			errorItem: [
				'-  La ruta que coloco en el navegador no existe',
				'-  Verifique la direccion'
			],
			backUrl: '/home'
		} 
	});
	console.error(err.stack);
	next();
});

router.route('/')
	.get(function(req, res){
		res.render('index', { title: 'SMDE' });  
	});

router.route('/login')
	.get(users.loginN, function(req, res){
  		res.render('login', { title: 'SMDE - Iniciar Sesión' })
	})
	.post(admin.login);

router.route('/logout')
	.post(admin.logout);

router.route('/home')
	.get(users.login, function(req, res){
		res.render('main', { 
			title: 'SMDE - Inicio',
			datos:  req.session.datos,
			privilegio:  req.session.privilegio })
	});

router.route('/profile')
	.get(users.login, function(req, res){
		res.render('profile', { 
			title: 'SMDE - Perfil',
			datos:  req.session.datos,
			privilegio:  req.session.privilegio })
	});

router.route('/subjects')
	.get(users.loginS, function(req, res){
		res.render('subjects', { 
			title: 'SMDE - Asignaturas',
			datos:  req.session.datos,
			privilegio:  req.session.privilegio })
	});

router.route('/contents')
	.get(users.loginS, function(req, res){
		res.render('contents', { 
			title: 'SMDE - Contenidos',
			datos:  req.session.datos,
			privilegio:  req.session.privilegio })
	});

router.route('/contents/:id_content')
	.get(users.loginS, function(req, res){
		res.render('contenttopic', { 
			title: 'SMDE - Contenidos',
			datos:  req.session.datos,
			privilegio:  req.session.privilegio })
	});

router.route('/messages')
	.get(users.login, function(req, res){
		res.render('messages', { 
			title: 'SMDE - Mensajes',
			datos:  req.session.datos,
			privilegio:  req.session.privilegio })
	});

router.route('/messages/:id_conversation')
	.get(users.login, function(req, res){
		res.render('messages', { 
			title: 'SMDE - Mensajes',
			datos:  req.session.datos,
			privilegio:  req.session.privilegio })
	});

router.route('/foro')
	.get(users.loginS, function(req, res){
		res.render('foro', { 
			title: 'SMDE - Foro',
			datos:  req.session.datos,
			privilegio:  req.session.privilegio })
	});

router.route('/foro/:id_topic')
	.get(users.loginS, function(req, res){
		res.render('forumtopic', { 
			title: 'SMDE - Foro',
			datos:  req.session.datos,
			privilegio:  req.session.privilegio })
	});

router.route('/settings')
	.get(users.login, function(req, res){
		res.render('settings', { 
			title: 'SMDE - Ajustes',
			datos:  req.session.datos,
			privilegio:  req.session.privilegio })
	});

router.route('/calendar')
	.get(users.login, function(req, res){
		res.render('calendar', { 
			title: 'SMDE - Agenda',
			datos:  req.session.datos,
			privilegio:  req.session.privilegio })
	});

router.route('/management')
	.get(users.loginA, function(req, res){
		res.render('management', { 
			title: 'SMDE - Gestion',
			datos:  req.session.datos,
			privilegio:  req.session.privilegio })
	});

module.exports = router;		