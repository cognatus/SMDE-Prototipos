-- --------------------------------------------------------------
--	INSERTS
-- --------------------------------------------------------------
BEGIN;

INSERT INTO `smdedbv1`.`User` (`userEmail` , `userName` , `userLastName`, 
  `userSecondLastName`, `userSex`, `userPassword`, `Institute_idInstitute`) 
VALUES ('alejandrodnl.cv@hotmail.com', 'Alejandro', 'Villarroel', 'Calderon', 'H', 'holaMundo123', 'PoliV9');

INSERT INTO `smdedbv1`.`Administrator` (`User_userEmail`,`idAdministrator`) 
VALUES ('alejandrodnl.cv@hotmail.com' , 'VICA970109HMCLLL03');

COMMIT;

BEGIN;

INSERT INTO `smdedbv1`.`User` (`userEmail` , `userName` , `userLastName`, 
  `userSecondLastName`, `userSex`, `userPassword`, `Institute_idInstitute`) 
VALUES ('hola@hola.com', 'Diego', 'Martinez', 'Moran', 'H', 'holaMundo123', 'PoliV9');

INSERT INTO `smdedbv1`.`Administrator` (`User_userEmail`,`idAdministrator`)  
VALUES ('hola@hola.com', 'MAMD970317HDFRRG07');

INSERT INTO `smdedbv1`.`User` (`userEmail` , `userName` , `userLastName`, 
  `userSecondLastName`, `userSex`, `userPassword`, `Institute_idInstitute`) 
VALUES ('vato@vato.com', 'Vato', 'Vato', 'Vato', 'H', 'vato123', 'PoliV9');

INSERT INTO `smdedbv1`.`Student` (`User_userEmail`,`idStudent`)  
VALUES ('vato@vato.com', 'VATOASDSAD46844');

COMMIT;

BEGIN;

INSERT INTO `smdedbv1`.`Department` (`idDepartment`, `departmentName`, `Institute_idInstitute`)  
VALUES ('HASD45465', 'Humanisticas', 'PoliV9');

INSERT INTO `smdedbv1`.`Subject` (`idSubject`, `subjectName`, `subjectLevel`, `Department_idDepartment`, `Department_Institute_idInstitute`) 
VALUES ('SDF46DF4884', 'Civismo', 1, 'HASD45465', 'PoliV9');

INSERT INTO `smdedbv1`.`Group` (`idGroup`, `groupName`, `groupLevel`) 
VALUES ('DFG8765SDF6', '1IV8', 1);

INSERT INTO `smdedbv1`.`Group_has_Subject` (`Group_idGroup`, `Subject_idSubject`) 
VALUES ('DFG8765SDF6', 'SDF46DF4884');

INSERT INTO `smdedbv1`.`Student_has_Subject` (`Student_idStudent`, `Subject_idSubject`) 
VALUES ('VATOASDSAD46844', 'SDF46DF4884');

COMMIT;

SELECT Administrator.idAdministrator, User.userEmail, User.userName, User.userLastName, User.Institute_idInstitute
FROM Administrator 
INNER JOIN User
ON Administrator.User_userEmail = User.userEmail;

SELECT * FROM User INNER JOIN Administrator
ON User.userEmail = Administrator.User_userEmail
WHERE User.userEmail= 'alejandrodnl.cv@hotmail.com' AND User.userPassword = 'holaMundo123';

SELECT userEmail, idStudent, idSubject, Group.groupName
FROM User as u
INNER JOIN Student as s
    ON u.userEmail = s.User_userEmail
INNER JOIN Student_has_Subject as ss
    ON s.idStudent = ss.Student_idStudent
INNER JOIN Subject as su
    ON su.idSubject = ss.Subject_idSubject
INNER JOIN Group_has_Subject as gs
    ON gs.Subject_idSubject = su.idSubject
INNER JOIN Group as g
    ON g.idGroup = gs.Group_idGroup;