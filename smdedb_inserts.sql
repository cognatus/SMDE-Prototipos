
START TRANSACTION;
USE `smdedbv1`;
INSERT INTO `smdedbv1`.`Institute` (`idInstitute`, `instituteName`) VALUES ('PoliV9', 'Voca 9 Batiz');

COMMIT;

BEGIN;
INSERT INTO `smdedbv1`.`User` (`idUser`, `userEmail` , `userName` , `userLastName`, 
  `userSecondLastName`, `userSex`, `userPassword`, `Institute_idInstitute`) 
VALUES ('VICA970109HMCLLL03', 'alejandrodnl.cv@hotmail.com', 'Alejandro', 'Villarroel', 'Calderon', 'H', 'holaMundo123', 'PoliV9');

INSERT INTO `smdedbv1`.`Administrator` (`idAdministrator`) 
VALUES ('VICA970109HMCLLL03');
COMMIT;

