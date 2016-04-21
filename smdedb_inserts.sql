-- --------------------------------------------------------------
--	INSERTS
-- --------------------------------------------------------------
BEGIN;
-- Admin Villa
INSERT INTO `smdedbv1`.`User` (`userEmail` , `userName` , `userLastName`, 
  `userSecondLastName`, `userSex`, `userPassword`, `Institute_idInstitute`) 
VALUES ('alejandrodnl.cv@hotmail.com', 'Alejandro', 'Villarroel', 'Calderon', 'H', 'holaMundo123', 'PoliV9');

INSERT INTO `smdedbv1`.`Administrator` (`User_userEmail`,`idAdministrator`) 
VALUES ('alejandrodnl.cv@hotmail.com' , 'VICA970109HMCLLL03');

COMMIT;

BEGIN;
-- Admin Diego
INSERT INTO `smdedbv1`.`User` (`userEmail` , `userName` , `userLastName`, 
  `userSecondLastName`, `userSex`, `userPassword`, `Institute_idInstitute`) 
VALUES ('hola@hola.com', 'Diego', 'Martinez', 'Moran', 'H', 'holaMundo123', 'PoliV9');

INSERT INTO `smdedbv1`.`Administrator` (`User_userEmail`,`idAdministrator`)  
VALUES ('hola@hola.com', 'MAMD970317HDFRRG07');

-- ESTUDIANTE CUALQUIERA
INSERT INTO `smdedbv1`.`User` (`userEmail` , `userName` , `userLastName`, 
  `userSecondLastName`, `userSex`, `userPassword`, `Institute_idInstitute`) 
VALUES ('vato@vato.com', 'Vato', 'Vato', 'Vato', 'H', 'holaMundo123', 'PoliV9');

INSERT INTO `smdedbv1`.`Student` (`User_userEmail`,`idStudent`)  
VALUES ('vato@vato.com', 'VATOASDSAD46844');

INSERT INTO `smdedbv1`.`User` (`userEmail` , `userName` , `userLastName`, 
  `userSecondLastName`, `userSex`, `userPassword`, `Institute_idInstitute`) 
VALUES ('vato2@vato.com', 'Angel', 'Montero', 'Cortes', 'H', 'holaMundo123', 'PoliV9');

INSERT INTO `smdedbv1`.`Student` (`User_userEmail`,`idStudent`)  
VALUES ('vato2@vato.com', 'VATO464568');

-- Profe cualquiera
INSERT INTO `smdedbv1`.`User` (`userEmail` , `userName` , `userLastName`, 
  `userSecondLastName`, `userSex`, `userPassword`, `Institute_idInstitute`) 
VALUES ('profe@profe.com', 'Profe', 'Profe', 'Profe', 'H', 'holaMundo123', 'PoliV9');

INSERT INTO `smdedbv1`.`Teacher` (`User_userEmail`,`idTeacher`)  
VALUES ('profe@profe.com', 'PROFASDSAD46844');

INSERT INTO `smdedbv1`.`User` (`userEmail` , `userName` , `userLastName`, 
  `userSecondLastName`, `userSex`, `userPassword`, `Institute_idInstitute`) 
VALUES ('profe2@profe.com', 'Luis', 'Profe', 'Martinez', 'H', 'holaMundo123', 'PoliV9');

INSERT INTO `smdedbv1`.`Teacher` (`User_userEmail`,`idTeacher`)  
VALUES ('profe2@profe.com', 'P20160410');

COMMIT;

BEGIN;
-- Departamento cualquiera
INSERT INTO `smdedbv1`.`Department` (`idDepartment`, `departmentName`, `Institute_idInstitute`)  
VALUES ('HASD45465', 'Humanisticas', 'PoliV9');

INSERT INTO `smdedbv1`.`Department` (`idDepartment`, `departmentName`, `Institute_idInstitute`)  
VALUES ('HAK85S5D65', 'Matemáticas', 'PoliV9');

-- materias cualquiera
INSERT INTO `smdedbv1`.`Subject` (`idSubject`, `subjectName`, `subjectLevel`, `Department_idDepartment`, `Department_Institute_idInstitute`) 
VALUES ('SDF46DF4884', 'Civismo', 1, 'HASD45465', 'PoliV9');

INSERT INTO `smdedbv1`.`Subject` (`idSubject`, `subjectName`, `subjectLevel`, `Department_idDepartment`, `Department_Institute_idInstitute`) 
VALUES ('SDF46DF6996', 'Literatura', 2, 'HASD45465', 'PoliV9');

INSERT INTO `smdedbv1`.`Subject` (`idSubject`, `subjectName`, `subjectLevel`, `Department_idDepartment`, `Department_Institute_idInstitute`) 
VALUES ('SDF46DF2332', 'Comunicacion', 1, 'HASD45465', 'PoliV9');

INSERT INTO `smdedbv1`.`Subject` (`idSubject`, `subjectName`, `subjectLevel`, `Department_idDepartment`, `Department_Institute_idInstitute`) 
VALUES ('SDF46JKSD86', 'Geometria', 3, 'HAK85S5D65', 'PoliV9');

-- grupos cualquiera
INSERT INTO `smdedbv1`.`Course` (`idCourse`, `courseName`, `courseLevel`, `Institute_idInstitute`) 
VALUES ('DFG8765SDF6', '1IV8', 1, 'PoliV9');

INSERT INTO `smdedbv1`.`Course` (`idCourse`, `courseName`, `courseLevel`, `Institute_idInstitute`) 
VALUES ('DFG87002356', '2IV4', 2, 'PoliV9');

INSERT INTO `smdedbv1`.`Course` (`idCourse`, `courseName`, `courseLevel`, `Institute_idInstitute`) 
VALUES ('DFG8765QWE7', '1IV5', 1, 'PoliV9');

-- Relacion grupo materia
INSERT INTO `smdedbv1`.`Subject_has_Course` (`Course_idCourse`, `Subject_idSubject`) 
VALUES ('DFG8765SDF6', 'SDF46DF4884');

INSERT INTO `smdedbv1`.`Subject_has_Course` (`Course_idCourse`, `Subject_idSubject`) 
VALUES ('DFG8765SDF6', 'SDF46DF6996');

INSERT INTO `smdedbv1`.`Subject_has_Course` (`Course_idCourse`, `Subject_idSubject`) 
VALUES ('DFG8765QWE7', 'SDF46DF2332');

INSERT INTO `smdedbv1`.`Subject_has_Course` (`Course_idCourse`, `Subject_idSubject`) 
VALUES ('DFG8765QWE7', 'SDF46DF4884');

INSERT INTO `smdedbv1`.`Subject_has_Course` (`Course_idCourse`, `Subject_idSubject`) 
VALUES ('DFG87002356', 'SDF46DF6996');

INSERT INTO `smdedbv1`.`Subject_has_Course` (`Course_idCourse`, `Subject_idSubject`) 
VALUES ('DFG87002356', 'SDF46JKSD86');

-- Relacion estudiantes materias grupos
INSERT INTO `smdedbv1`.`Student_has_Subject_has_Course` (`Student_idStudent`, `Subject_has_Course_Subject_idSubject`, `Subject_has_Course_Course_idCourse`) 
VALUES ('VATOASDSAD46844', 'SDF46DF4884', 'DFG8765SDF6');

INSERT INTO `smdedbv1`.`Student_has_Subject_has_Course` (`Student_idStudent`, `Subject_has_Course_Subject_idSubject`, `Subject_has_Course_Course_idCourse`) 
VALUES ('VATOASDSAD46844', 'SDF46DF2332', 'DFG8765QWE7');

INSERT INTO `smdedbv1`.`Student_has_Subject_has_Course` (`Student_idStudent`, `Subject_has_Course_Subject_idSubject`, `Subject_has_Course_Course_idCourse`) 
VALUES ('VATO464568', 'SDF46DF2332', 'DFG8765QWE7');

INSERT INTO `smdedbv1`.`Student_has_Subject_has_Course` (`Student_idStudent`, `Subject_has_Course_Subject_idSubject`, `Subject_has_Course_Course_idCourse`) 
VALUES ('VATO464568', 'SDF46DF4884', 'DFG8765QWE7');

INSERT INTO `smdedbv1`.`Student_has_Subject_has_Course` (`Student_idStudent`, `Subject_has_Course_Subject_idSubject`, `Subject_has_Course_Course_idCourse`) 
VALUES ('VATO464568', 'SDF46JKSD86', 'DFG87002356');

INSERT INTO `smdedbv1`.`Student_has_Subject_has_Course` (`Student_idStudent`, `Subject_has_Course_Subject_idSubject`, `Subject_has_Course_Course_idCourse`) 
VALUES ('VATOASDSAD46844', 'SDF46JKSD86', 'DFG87002356');

COMMIT;

BEGIN;
-- Relacion profes materias grupos
INSERT INTO `smdedbv1`.`Teacher_has_Subject_has_Course` (`Teacher_idTeacher`, `Subject_has_Course_Subject_idSubject`, `Subject_has_Course_Course_idCourse`) 
VALUES ('PROFASDSAD46844', 'SDF46DF2332', 'DFG8765QWE7');

INSERT INTO `smdedbv1`.`Teacher_has_Subject_has_Course` (`Teacher_idTeacher`, `Subject_has_Course_Subject_idSubject`, `Subject_has_Course_Course_idCourse`) 
VALUES ('PROFASDSAD46844', 'SDF46DF6996', 'DFG8765SDF6');

INSERT INTO `smdedbv1`.`Teacher_has_Subject_has_Course` (`Teacher_idTeacher`, `Subject_has_Course_Subject_idSubject`, `Subject_has_Course_Course_idCourse`) 
VALUES ('P20160410', 'SDF46DF6996', 'DFG87002356');

COMMIT;

-------------------------------------------------------------------------------------------------
--		SELECTS
-------------------------------------------------------------------------------------------------

SELECT Administrator.idAdministrator, User.userEmail, User.userName, User.userLastName, User.Institute_idInstitute
FROM Administrator 
INNER JOIN User
ON Administrator.User_userEmail = User.userEmail;

SELECT * FROM User INNER JOIN Administrator
ON User.userEmail = Administrator.User_userEmail
WHERE User.userEmail= 'alejandrodnl.cv@hotmail.com' AND User.userPassword = 'holaMundo123';


SELECT userEmail, idStudent, userName, userLastName, userSecondLastName, userSex, idSubject, subjectName, courseName
	FROM User AS u
	INNER JOIN Student AS s
	    ON u.userEmail = s.User_userEmail
	INNER JOIN Student_has_Subject_has_Course AS ss
	    ON s.idStudent = ss.Student_idStudent
	INNER JOIN Subject_has_Course AS sc
	    ON ss.Subject_has_Course_Subject_idSubject = sc.Subject_idSubject
		AND ss.Subject_has_Course_Course_idCourse = sc.Course_idCourse
	INNER JOIN Subject AS su
	    ON sc.Subject_idSubject = su.idSubject
	INNER JOIN Course AS c
	    ON sc.Course_idCourse = c.idCourse
	ORDER BY c.courseName ASC;


SELECT userEmail, idStudent, subjectName, idSubject, idCourse, courseName
	FROM User AS u
	INNER JOIN Student AS s
		ON u.userEmail = s.User_userEmail
	INNER JOIN Student_has_Subject_has_Course AS shshc
		ON shshc.Student_idStudent = s.idStudent
	INNER JOIN Subject_has_Course AS shc
		ON shshc.Subject_has_Course_Subject_idSubject = shc.Subject_idSubject
		AND shshc.Subject_has_Course_Course_idCourse = shc.Course_idCourse
	INNER Join Subject AS su
		ON su.idSubject = shc.Subject_idSubject
	INNER JOIN Course AS c 
		ON c.idCourse = shc.Course_idCourse;

SELECT userEmail, idTeacher, subjectName, idSubject, idCourse, courseName
	FROM User AS u
	INNER JOIN Teacher AS s
		ON u.userEmail = s.User_userEmail
	INNER JOIN Teacher_has_Subject_has_Course AS shshc
		ON shshc.Teacher_idTeacher = s.idTeacher
	INNER JOIN Subject_has_Course AS shc
		ON shshc.Subject_has_Course_Subject_idSubject = shc.Subject_idSubject
		AND shshc.Subject_has_Course_Course_idCourse = shc.Course_idCourse
	INNER Join Subject AS su
		ON su.idSubject = shc.Subject_idSubject
	INNER JOIN Course AS c 
		ON c.idCourse = shc.Course_idCourse;


--CONTACTOS AlUMNO-ALUMNO Y CURSO EN QUE COINCIDEN
SET @tipo = 'VATOASDSAD46844';

SELECT userEmail, userName, userLastName, userSecondLastName, subjectName, courseName 
FROM Student_has_Subject_has_Course a
	JOIN Student_has_Subject_has_Course b
		ON a.Subject_has_Course_Subject_idSubject = b.Subject_has_Course_Subject_idSubject
		AND a.Subject_has_Course_Course_idCourse = b.Subject_has_Course_Course_idCourse
		AND a.Student_idStudent != b.Student_idStudent
	INNER JOIN Subject as sub
		ON sub.idSubject = b.Subject_has_Course_Subject_idSubject
	INNER JOIN Course as c
		ON c.idCourse = b.Subject_has_Course_Course_idCourse
	INNER JOIN Student as s
		ON s.idStudent = b.Student_idStudent
	INNER JOIN User as u
		ON u.userEmail = s.User_userEmail
	WHERE a.Student_idStudent = @tipo
    AND b.Student_idStudent != @tipo;

--CONTACTOS AlUMNO-PROFE Y CURSO EN QUE COINCIDEN

SET @tipo = 'VATOASDSAD46844';

SELECT userEmail, userName, userLastName, userSecondLastName, subjectName, courseName 
FROM Student_has_Subject_has_Course a
	JOIN Teacher_has_Subject_has_Course b
		ON a.Subject_has_Course_Subject_idSubject = b.Subject_has_Course_Subject_idSubject
		AND a.Subject_has_Course_Course_idCourse = b.Subject_has_Course_Course_idCourse
		AND a.Student_idStudent != b.Teacher_idTeacher
	INNER JOIN Subject as sub
		ON sub.idSubject = b.Subject_has_Course_Subject_idSubject
	INNER JOIN Course as c
		ON c.idCourse = b.Subject_has_Course_Course_idCourse
	INNER JOIN Teacher as t
		ON t.idTeacher = b.Teacher_idTeacher
	INNER JOIN User as u
		ON u.userEmail = t.User_userEmail
	WHERE a.Student_idStudent = @tipo
    AND b.Teacher_idTeacher != @tipo;


--CONTACTOS PROFE-PROFE Y CURSO EN QUE COINCIDEN
SET @tipo = 'profe@profe.com';

SELECT userEmail, a.*, subjectName, courseName 
FROM Teacher_has_Subject_has_Course a
	JOIN Teacher_has_Subject_has_Course b
		ON a.Subject_has_Course_Subject_idSubject = b.Subject_has_Course_Subject_idSubject
		AND a.Subject_has_Course_Course_idCourse = b.Subject_has_Course_Course_idCourse
		AND a.Teacher_idTeacher != b.Teacher_idTeacher
	INNER JOIN Subject as sub
		ON sub.idSubject = a.Subject_has_Course_Subject_idSubject
	INNER JOIN Course as c
		ON c.idCourse = a.Subject_has_Course_Course_idCourse
	INNER JOIN Teacher as s
		ON s.idTeacher = a.Teacher_idTeacher
	INNER JOIN User as u
		ON u.userEmail = s.User_userEmail
	WHERE userEmail != @tipo;


--MOTRAR MATERIAS DE LAS PERSONAS QUE COINCIDEN
SELECT subjectName, courseName
FROM Student_has_Subject_has_Course a
JOIN Student_has_Subject_has_Course b
	ON a.Subject_has_Course_Subject_idSubject = b.Subject_has_Course_Subject_idSubject
	AND a.Subject_has_Course_Course_idCourse = b.Subject_has_Course_Course_idCourse
	AND a.Student_idStudent != b.Student_idStudent
INNER JOIN Subject as sub
	ON sub.idSubject = a.Subject_has_Course_Subject_idSubject
INNER JOIN Course as c
	ON c.idCourse = a.Subject_has_Course_Course_idCourse
INNER JOIN Student as s
	ON s.idStudent = b.Student_idStudent
INNER JOIN User as u
	ON u.userEmail = s.User_userEmail
WHERE a.Student_idStudent = "VATOASDSAD46844"
AND b.Student_idStudent != "VATOASDSAD46844"
AND b.Student_idStudent = "VATO464568"; 

-- Asignaturas para inscribir que no tiene el Alumno
SELECT idSubject, idCourse, subjectName, courseName
FROM Subject_has_Course a
INNER JOIN Subject AS s
	ON s.idSubject = a.Subject_idSubject
INNER JOIN Course AS c
	ON c.idCourse = a.Course_idCourse
WHERE Subject_idSubject IN(
	SELECT Subject_has_Course_Subject_idSubject 
	FROM Student_has_Subject_has_Course b
	WHERE b.Student_idStudent = 'VATOASDSAD46844'
) = a.Subject_idSubject;

-- Asignaturas para inscribir que no tiene el Profesor
SELECT idSubject, idCourse, subjectName, courseName
FROM Subject_has_Course a
INNER JOIN Subject AS s
	ON s.idSubject = a.Subject_idSubject
INNER JOIN Course AS c
	ON c.idCourse = a.Course_idCourse
WHERE Subject_idSubject IN(
	SELECT Subject_has_Course_Subject_idSubject 
	FROM Teacher_has_Subject_has_Course b
	WHERE b.Teacher_idTeacher = 'VATOASDSAD46844'
) = a.Subject_idSubject;
