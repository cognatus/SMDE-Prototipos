var express = require('express');
var app = express();
var router = express.Router();

var admin = require('../api/admin');
var agenda = require('../api/agenda');
var asignaturas = require('../api/asignaturas');
var foro = require('../api/foro');
var mensajes = require('../api/mensajes');
var perfil = require('../api/perfil');

/* GET home page. */

// Middleware para usar en todas las peticiones
router.use(function(req, res, next) {
	console.log('----------- Peticion a api ------------');
	next();
});

router.get('/', function(req, res) {
    res.json({ message: 'Bienvenido a SMDE prro' });   
});

// Todo lo referente a la gestion
router.route('/users/admins')
	.get(admin.getAdministratorsDatabase);

router.route('/users/students')
	.get(admin.getStudentsDatabase);
	.post(admin.insertStudent);

router.route('/users/teachers')
	.get(admin.getTeachersDatabase);
	.post(admin.insertTeacher);

router.route('/subjects')
	.get(admin.getSubjectsDatabase);
	.post(admin.insertSubject);

router.route('/depts')
	.get(admin.getDepartmentsDatabase);
	.post(admin.insertDept);

router.route('/groups')
	.get(admin.getCoursesDatabase);
	.post(admin.insertCourse);

router.route('/courses')
	.get(admin.getSubjectCourseDatabase);
	.post(admin.insertSubjectCourse);	

app.admin('/insertSubjectCourse', admin.insertSubjectCourse);
app.get('/getStudentsSubjectsDatabase', admin.getStudentsSubjectsDatabase);
app.get('/getTeachersSubjectsDatabase', admin.getTeachersSubjectsDatabase);

module.exports = router;
