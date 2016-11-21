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
	.get(admin.getStudentsDatabase)
	.post(admin.insertStudent);

router.route('/users/teachers')
	.get(admin.getTeachersDatabase)
	.post(admin.insertTeacher);

router.route('/subjects')
	.get(admin.getSubjectsDatabase)
	.post(admin.insertSubject);

router.route('/depts')
	.get(admin.getDepartmentsDatabase)
	.post(admin.insertDept);

router.route('/groups')
	.get(admin.getCoursesDatabase)
	.post(admin.insertCourse);

router.route('/courses')
	.get(admin.getSubjectsCoursesDatabase)
	.post(admin.insertSubjectCourse);

router.route('/users/students/:id_student/subjects')
	.get(admin.getStudentsSubjectsDatabase);

router.route('/users/teachers/:id_teacher/subjects')
	.get(admin.getTeachersSubjectsDatabase);


//Todo referente al perfil
router.route('/profile/setProfileTheme')
	.post(perfil.setProfileTheme);

router.route('/profile/setProfileMsmColor')
	.post(perfil.setProfileMsmColor);

router.route('/profile/subjects')
	.get(perfil.getProfileSubjectsDatabase);

router.route('/profile/admins')
	.get(perfil.getProfileContactsAdministrators);

router.route('/profile/students')
	.get(perfil.getProfileContactsStudents);

router.route('/profile/teachers')
	.get(perfil.getProfileContactsTeachers);

router.route('/profile/students/:id_student/subjects')
	.get(perfil.getStudentCoincidences);

router.route('/profile/teachers/:id_teacher/subjects')
	.get(perfil.getTeacherCoincidences);

router.route('/profile/updatephotos')
	.post(perfil.updateProfilePhotos);

//Todo referente a la vista de Asignaturas
router.route('/profile/availablecourses')
	.get(asignaturas.getSubjectsCoursesDatabase)
	.post(asignaturas.insertSubjectsCoursesSelfUser);

// Todo referente a la agenda
router.route('/profile/calendar/subjects')
	.get(agenda.getProfileSubjectsDatabaseCalendar);

router.route('/profile/reminders')
	.get(agenda.getRemindersDatabase)
	.post(agenda.insertReminder);

router.route('/profile/publications')
	.get(agenda.getPublicationsDatabase)
	.post(agenda.insertPublication);

router.route('/profile/publications/:id_publication')
	.get(agenda.getPublicationAttachedFiles);

router.route('/download/:id_file')
	.get(agenda.downloadAttachment);

//Todo lo referente a la mensajeria
router.route('/messages')
	.get(mensajes.getLobbiesDatabase)
	.post(mensajes.insertLobby);

router.route('/messages/:id_lobby')
	.get(mensajes.getLobbyById)
	.post(mensajes.insertNewMessage);

router.route('/contacts/admins')
	.get(mensajes.getProfileContactsAdministratorsMsm);

router.route('/contacts/students')
	.get(mensajes.getProfileContactsStudentsMsm);

router.route('/contacts/teachers')
	.get(mensajes.getProfileContactsTeachersMsm);

//Todo lo referente al foro
router.route('/forum')
	.get(foro.getForumTopics)
	.post(foro.insertForumTopic);

router.route('/forum/:id_topic')
	.get(foro.getForumTopicCommentsCron)
	.post(foro.insertForumTopicComment);

router.route('/forum/:id_topic/:id_comment')
	.get(foro.getForumTopicCommentReplies)
	.post(foro.insertForumTopicCommentReply);

router.route('/forum/:id_topic/:id_comment/like')
	.post(foro.likeForumComment);

router.route('/forum/:id_topic/:id_comment/:id_reply/like')
	.post(foro.likeForumCommentReply);

module.exports = router;
