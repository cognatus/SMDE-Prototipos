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

-- Profe cualquiera
INSERT INTO `smdedbv1`.`User` (`userEmail` , `userName` , `userLastName`, 
  `userSecondLastName`, `userSex`, `userPassword`, `Institute_idInstitute`) 
VALUES ('profe@profe.com', 'Profe', 'Profe', 'Profe', 'H', 'holaMundo123', 'PoliV9');

INSERT INTO `smdedbv1`.`Teacher` (`User_userEmail`,`idTeacher`)  
VALUES ('profe@profe.com', 'PROFASDSAD46844');

COMMIT;

BEGIN;
-- Departamento cualquiera
INSERT INTO `smdedbv1`.`Department` (`idDepartment`, `departmentName`, `Institute_idInstitute`)  
VALUES ('HASD45465', 'Humanisticas', 'PoliV9');

-- materias cualquiera
INSERT INTO `smdedbv1`.`Subject` (`idSubject`, `subjectName`, `subjectLevel`, `Department_idDepartment`, `Department_Institute_idInstitute`) 
VALUES ('SDF46DF4884', 'Civismo', 1, 'HASD45465', 'PoliV9');

INSERT INTO `smdedbv1`.`Subject` (`idSubject`, `subjectName`, `subjectLevel`, `Department_idDepartment`, `Department_Institute_idInstitute`) 
VALUES ('SDF46DF6996', 'Literatura', 1, 'HASD45465', 'PoliV9');

INSERT INTO `smdedbv1`.`Subject` (`idSubject`, `subjectName`, `subjectLevel`, `Department_idDepartment`, `Department_Institute_idInstitute`) 
VALUES ('SDF46DF2332', 'Comunicacion', 1, 'HASD45465', 'PoliV9');

-- grupos cualquiera
INSERT INTO `smdedbv1`.`Course` (`idCourse`, `courseName`, `courseLevel`, `Institute_idInstitute`) 
VALUES ('DFG8765SDF6', '1IV8', 1, 'PoliV9');

INSERT INTO `smdedbv1`.`Course` (`idCourse`, `courseName`, `courseLevel`, `Institute_idInstitute`) 
VALUES ('DFG8765QWE7', '1IV5', 1, 'PoliV9');

-- Relacion grupo materia
INSERT INTO `smdedbv1`.`Subject_has_Course` (`Course_idCourse`, `Subject_idSubject`) 
VALUES ('DFG8765SDF6', 'SDF46DF4884');

INSERT INTO `smdedbv1`.`Subject_has_Course` (`Course_idCourse`, `Subject_idSubject`) 
VALUES ('DFG8765SDF6', 'SDF46DF6996');

INSERT INTO `smdedbv1`.`Subject_has_Course` (`Course_idCourse`, `Subject_idSubject`) 
VALUES ('DFG8765QWE7', 'SDF46DF2332');

-- Relacion estudiantes materias grupos
INSERT INTO `smdedbv1`.`Student_has_Subject_has_Course` (`Student_idStudent`, `Subject_has_Course_Subject_idSubject`, `Subject_has_Course_Course_idCourse`) 
VALUES ('VATOASDSAD46844', 'SDF46DF4884', 'DFG8765SDF6');

INSERT INTO `smdedbv1`.`Student_has_Subject_has_Course` (`Student_idStudent`, `Subject_has_Course_Subject_idSubject`, `Subject_has_Course_Course_idCourse`) 
VALUES ('VATOASDSAD46844', 'SDF46DF2332', 'DFG8765QWE7');

-- Relacion profes materias grupos
INSERT INTO `smdedbv1`.`Teacher_has_Subject_has_Course` (`Teacher_idTeacher`, `Subject_has_Course_Subject_idSubject`, `Subject_has_Course_Course_idCourse`) 
VALUES ('PROFASDSAD46844', 'SDF46DF2332', 'DFG8765QWE7');

INSERT INTO `smdedbv1`.`Teacher_has_Subject_has_Course` (`Teacher_idTeacher`, `Subject_has_Course_Subject_idSubject`, `Subject_has_Course_Course_idCourse`) 
VALUES ('PROFASDSAD46844', 'SDF46DF6996', 'DFG8765SDF6');

COMMIT;

SELECT Administrator.idAdministrator, User.userEmail, User.userName, User.userLastName, User.Institute_idInstitute
FROM Administrator 
INNER JOIN User
ON Administrator.User_userEmail = User.userEmail;

SELECT * FROM User INNER JOIN Administrator
ON User.userEmail = Administrator.User_userEmail
WHERE User.userEmail= 'alejandrodnl.cv@hotmail.com' AND User.userPassword = 'holaMundo123';

SELECT userEmail, idStudent, subjectName, courseName
FROM User as u
INNER JOIN Student as s
    ON u.userEmail = s.User_userEmail
INNER JOIN Student_has_Subject as ss
    ON s.idStudent = ss.Student_idStudent
INNER JOIN Subject as su
    ON su.idSubject = ss.Subject_idSubject
INNER JOIN Subject_has_Course as sc
    ON sc.Subject_idSubject = su.idSubject
INNER JOIN Course as c
    ON c.idCourse = sc.Course_idCourse;