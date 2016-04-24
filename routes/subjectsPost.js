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
					+ ' AND d.Institute_idInstitute = "' + req.session.datos[0].Institute_idInstitute + '" '
					+ ' ORDER BY courseName ASC, subjectName ASC; ';
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
					+ ' AND d.Institute_idInstitute = "' + req.session.datos[0].Institute_idInstitute + '" '
					+ ' ORDER BY courseName ASC, subjectName ASC; ';
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
					backUrl: '/subjects'
				}
			});
		}
	});

};

// FUNCION PARA INSERTAR ASIGNATURAS/GRUPOS
exports.insertSubjectsCoursesSelfUser = function(req, res){
	var database = new base();

	var coursesInput = req.body.insertCoursesField;

	//PRIMERO SEPARAMOS LOS CURSOS A INSCRIBIR
	var coursesArray = coursesInput.split(',');
	//ELIMINAMOS EL ULTIMO ELEMENTO POR QUE ES NULO
	coursesArray.pop();

	for(var i = 0; i < = coursesArray.length; i++){

	}

	//SEPARAMOS ASIGNATURAS DE GRUPOS;

	stringQuery = 'BEGIN;';

	   // SI EL USUARIO ES TIPO ALUMNO
	    for( var i = 0; i < coursesArray.length; i++ ) {
	    if(req.session.privilegio == 1){

	    	stringQuery	+= 'INSERT INTO Student_has_Subject_has_Course'
						+ ' (Student_idStudent, Subject_has_Course_Subject_idSubject, Subject_has_Course_Course_idCourse)'
						+ ' VALUES' 
						+ '("'  + req.session.datos[0].idStudent +  '",'
						+ ' "' + subjectsId[i] + '",'
						+' "' + coursesId[i] + '");';
		}

		// SI EL USUARIO ES TIPO PROFESOR
	    if(req.session.privilegio == 1){

		   	stringQuery	+= 'INSERT INTO Teacher_has_Subject_has_Course'
						+ ' (Teacher_idTeacher, Subject_has_Course_Subject_idSubject, Subject_has_Course_Course_idCourse)'
						+ ' VALUES' 
						+ '("'  + req.session.datos[0].idTeacher +  '",'
						+ ' "' + subjectsId[i] + '",'
						+' "' + coursesId[i] + '");';
		    	
		}
		
	}
	stringQuery += 'COMMIT;'

	database.query(stringQuery, function(error, result, row){
		if(!error) {
			console.log(stringQuery);
			res.redirect('/subjects');
		}else{
			console.log('Error en esta consulta: ' + stringQuery + ' Error: ' + error);
			res.render('error' , {
				errorData: {
					errorTitle: 'Error al inscribir Curso',
					errorItem: ['-  Problemas con el servidor',
					'-  Posiblemente algun dato enviado es nulo o incorrecto'],
					backUrl: '/subjects'
				}
			});
		}
	});

};
