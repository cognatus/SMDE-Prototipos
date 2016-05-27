-- --------------------------------------------------------------
--	INSERTS
-- --------------------------------------------------------------
BEGIN;
-- Admin Villa
INSERT INTO `smdedbv1`.`User` (`userEmail` , `userName` , `userLastName`, 
  `userSecondLastName`, `userSex`, `userPassword`, `Institute_idInstitute`,`photoName`) 
VALUES ('alejandrodnl.cv@hotmail.com', 'Alejandro', 'Villarroel', 'Calderon', 'H', 'holaMundo123', 'IPNCECyt9JDDB',UUID());

INSERT INTO `smdedbv1`.`Administrator` (`User_userEmail`,`idAdministrator`) 
VALUES ('alejandrodnl.cv@hotmail.com' , 'VICA970109HMCLLL03');

COMMIT;

BEGIN;
-- Admin Diego
INSERT INTO `smdedbv1`.`User` (`userEmail` , `userName` , `userLastName`, 
  `userSecondLastName`, `userSex`, `userPassword`, `Institute_idInstitute`,`photoName`) 
VALUES ('hola@hola.com', 'Diego', 'Martinez', 'Moran', 'H', 'holaMundo123', 'IPNCECyt9JDDB',UUID());

INSERT INTO `smdedbv1`.`Administrator` (`User_userEmail`,`idAdministrator`)  
VALUES ('hola@hola.com', 'MAMD970317HDFRRG07');

-- ESTUDIANTE CUALQUIERA
INSERT INTO `smdedbv1`.`User` (`userEmail` , `userName` , `userLastName`, 
  `userSecondLastName`, `userSex`, `userPassword`, `Institute_idInstitute`,`photoName`) 
VALUES ('vato@vato.com', 'Vato', 'Vato', 'Vato', 'H', 'holaMundo123', 'IPNCECyt9JDDB',UUID());

INSERT INTO `smdedbv1`.`Student` (`User_userEmail`,`idStudent`)  
VALUES ('vato@vato.com', 'VATOASDSAD46844');

INSERT INTO `smdedbv1`.`User` (`userEmail` , `userName` , `userLastName`, 
  `userSecondLastName`, `userSex`, `userPassword`, `Institute_idInstitute`,`photoName`) 
VALUES ('vato2@vato.com', 'Angel', 'Montero', 'Cortes', 'H', 'holaMundo123', 'IPNCECyt9JDDB',UUID());

INSERT INTO `smdedbv1`.`Student` (`User_userEmail`,`idStudent`)  
VALUES ('vato2@vato.com', 'VATO464568');

-- Profe cualquiera
INSERT INTO `smdedbv1`.`User` (`userEmail` , `userName` , `userLastName`, 
  `userSecondLastName`, `userSex`, `userPassword`, `Institute_idInstitute`,`photoName`) 
VALUES ('profe@profe.com', 'Profe', 'Profe', 'Profe', 'H', 'holaMundo123', 'IPNCECyt9JDDB',UUID());

INSERT INTO `smdedbv1`.`Teacher` (`User_userEmail`,`idTeacher`)  
VALUES ('profe@profe.com', 'PROFASDSAD46844');

INSERT INTO `smdedbv1`.`User` (`userEmail` , `userName` , `userLastName`, 
  `userSecondLastName`, `userSex`, `userPassword`, `Institute_idInstitute`,`photoName`) 
VALUES ('profe2@profe.com', 'Luis', 'Profe', 'Martinez', 'H', 'holaMundo123', 'IPNCECyt9JDDB',UUID());

INSERT INTO `smdedbv1`.`Teacher` (`User_userEmail`,`idTeacher`)  
VALUES ('profe2@profe.com', 'P20160410');

COMMIT;

BEGIN;
-- Departamento cualquiera
INSERT INTO `smdedbv1`.`Department` (`idDepartment`, `departmentName`, `Institute_idInstitute`)  
VALUES ('HASD45465', 'Humanisticas', 'IPNCECyt9JDDB');

INSERT INTO `smdedbv1`.`Department` (`idDepartment`, `departmentName`, `Institute_idInstitute`)  
VALUES ('HAK85S5D65', 'Matemáticas', 'IPNCECyt9JDDB');

-- materias cualquiera
INSERT INTO `smdedbv1`.`Subject` (`idSubject`, `subjectName`, `subjectLevel`, `Department_idDepartment`, `Department_Institute_idInstitute`) 
VALUES ('SDF46DF4884', 'Civismo', 1, 'HASD45465', 'IPNCECyt9JDDB');

INSERT INTO `smdedbv1`.`Subject` (`idSubject`, `subjectName`, `subjectLevel`, `Department_idDepartment`, `Department_Institute_idInstitute`) 
VALUES ('SDF46DF6996', 'Literatura', 2, 'HASD45465', 'IPNCECyt9JDDB');

INSERT INTO `smdedbv1`.`Subject` (`idSubject`, `subjectName`, `subjectLevel`, `Department_idDepartment`, `Department_Institute_idInstitute`) 
VALUES ('SDF46DF2332', 'Comunicacion', 1, 'HASD45465', 'IPNCECyt9JDDB');

INSERT INTO `smdedbv1`.`Subject` (`idSubject`, `subjectName`, `subjectLevel`, `Department_idDepartment`, `Department_Institute_idInstitute`) 
VALUES ('SDF46JKSD86', 'Geometria', 3, 'HAK85S5D65', 'IPNCECyt9JDDB');

-- grupos cualquiera
INSERT INTO `smdedbv1`.`Course` (`idCourse`, `courseName`, `courseLevel`, `Institute_idInstitute`) 
VALUES ('DFG8765SDF6', '1IV8', 1, 'IPNCECyt9JDDB');

INSERT INTO `smdedbv1`.`Course` (`idCourse`, `courseName`, `courseLevel`, `Institute_idInstitute`) 
VALUES ('DFG87002356', '2IV4', 2, 'IPNCECyt9JDDB');

INSERT INTO `smdedbv1`.`Course` (`idCourse`, `courseName`, `courseLevel`, `Institute_idInstitute`) 
VALUES ('DFG8765QWE7', '1IV5', 1, 'IPNCECyt9JDDB');

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