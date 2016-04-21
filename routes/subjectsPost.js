var base;
var stringQuery = '';

exports.constructor = function (basee) {
	base = basee;
}


/*
 * POST Methods.
 */


// FUNCION PARA MOSTRAR ASIGNATURAS/GRUPOS
exports.getSubjectsCoursesDatabase = function(req, res){
	var database = new base();

	// SI EL USUARIO ES TIPO ALUMNO
	if(req.session.privilegio == 1){
		stringQuery = 'SELECT idSubject, idCourse, subjectName, courseName, departmentName, subjectLevel '
					+ ' FROM Subject_has_Course a '
					+ ' INNER JOIN Subject AS s '
					+ ' 	ON s.idSubject = a.Subject_idSubject '
					+ ' INNER JOIN Course AS c '
					+ ' 	ON c.idCourse = a.Course_idCourse '
					+ ' INNER JOIN Department AS d '
					+ ' 	ON d.idDepartment = s.Department_idDepartment '
					+ ' WHERE Subject_idSubject IN( '
					+ ' 	SELECT Subject_has_Course_Subject_idSubject  '
					+ ' 	FROM Student_has_Subject_has_Course b '
					+ ' 	WHERE b.Student_idStudent = "' + req.session.datos[0].idStudent + '" '
					+ ' ) = a.Subject_idSubject ';
					+ ' AND d.Institute_idInstitute = "' + req.session.datos[0].Institute_idInstitute + '" ';
	}
	
	// SI EL USUARIO ES TIPO PROFESOR
	if(req.session.privilegio == 2){
		stringQuery = 'SELECT idSubject, idCourse, subjectName, courseName, departmentName, subjectLevel '
					+ ' FROM Subject_has_Course a '
					+ ' INNER JOIN Subject AS s '
					+ ' 	ON s.idSubject = a.Subject_idSubject '
					+ ' INNER JOIN Course AS c '
					+ ' 	ON c.idCourse = a.Course_idCourse '
					+ ' INNER JOIN Department AS d '
					+ ' 	ON d.idDepartment = s.Department_idDepartment '
					+ ' WHERE Subject_idSubject IN( '
					+ ' 	SELECT Subject_has_Course_Subject_idSubject  '
					+ ' 	FROM Teacher_has_Subject_has_Course b '
					+ ' 	WHERE b.Teacher_idTeacher = "' + req.session.datos[0].idTeacher + '" '
					+ ' ) = a.Subject_idSubject ';
					+ ' AND d.Institute_idInstitute = "' + req.session.datos[0].Institute_idInstitute + '" ';
	}

	database.query(stringQuery, function(error, result, row){
		if(!error) {
			subjectscoursesData = result;
			res.send(subjectscoursesData);
		}else{
			console.log('Error en esta consulta: ' + stringQuery + ' Error: ' + error);
			res.render('error' , {
				errorData: {
					errorTitle: 'Error al obtener Grupos',
					errorItem: ['-  Problemas con el servidor',
					'-  Problemas con la Base de Datos'],
					backUrl: '/management'
				}
			});
		}
	});

};
