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

	stringQuery = 'SELECT idSubject, idCourse, subjectName, courseName, departmentName, subjectLevel '
					+ ' FROM Subject_has_Course as sc '
					+ ' INNER JOIN Subject as su '
					+ '     ON sc.Subject_idSubject = su.idSubject '
					+ ' INNER JOIN Course as c '
					+ '     ON sc.Course_idCourse = c.idCourse '
					+ ' INNER JOIN Department as d '
					+ '     ON d.idDepartment = su.Department_idDepartment '
					+ ' WHERE su.Department_Institute_idInstitute= "' + req.session.datos[0].Institute_idInstitute + '" '
					+ ' ORDER BY courseName ASC, subjectName ASC; '; 

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
