USE school_db;

INSERT INTO `AccessTypes` (`id`,`name`) VALUES 
('1', 'Teacher'), 
('2', 'Student'), 
('3', 'Parent'),
('4', 'Admin');

INSERT INTO `Users`(`id`,`userName`,`firstName`, `lastName`,`password`,`phone`,`email`,`AccessTypeId`)
VALUES
('1', 'dprice', 'Dylan', 'Price', '$2a$10$sgjuiLpGaMbth5DyqBSv9ekqBMWq9PSxaybA/PYePnJirXbcbJFV6', '(09) 0533 5366', 'dprice@fakemail.com', '1'),
('2', 'lhall', 'Lily', 'Hall', '$2a$10$6HUAMpSLMTnyZwl9e/NOPOUshOmjXXZysGwHCH43jngqtXp/.jVeW', '(09) 2286 0460', 'lhall@fakemail.com', '1'),
('3', 'edavis', 'Emily', 'Davis', '$2a$10$vr5uL/3G09RPGQYpwLGf8O4xKjYwn2U2DGqHRlCkyoMMgZ8k3GUCW', '(09) 8996 0863', 'edavis@fakemail.com','1'),
('4', 'dchen', 'David', 'Chen', '$2a$10$UwUs.oWt4fog7ncSX9MN4.mvkXe2FasK7aH8BIcO82Ps8b.CMo/Iy', '(09) 9903 4032', 'dchen@fakemail.com', '1'),
('10', 'tlee', 'Thomas', 'Lee', '$2a$10$tPfLHlV4aKg41uWJXVW3G.xttn5wP0qFxcjX9JWFiyebQ2K9MNMg6', '(09) 0484 0908', 'tlee@fakemail.com', '2'),
('11', 'hjones', 'Holly', 'Jones', '$2a$10$LHE5TLlZwrrrOxOuoa/xluZNQBYBqmf6qtm.noplH/5mAI/pZabga', '(09) 7118 3813', 'hjones@fakemail.com', '2'),
('12', 'amiller', 'Amy', 'Miller', '$2a$10$YVLzvTqfjzF9ekSPW.b1t.iFWEZD/o4jgzrRt2YMllF/6CVCGST42', '(09) 1741 4400', 'amiller@fakemail.com', '2'),
('13', 'mpatil', 'Myra', 'Patil', '$2a$10$0qkOSmiThcYIX6Paqx8L6.2pytsdycZpPO396RMlWOoo3U.sRb5ii', '(09) 3597 9499', 'mpatil@fakemail.com', '2'),
('14', 'dtran', 'Daisy', 'Tran', '$2a$10$XKpwhOX4YNdZk2CsMp41HeFp3xsQY4NcqZAhcs0GIfafvwzpnqcwe', '(09) 3238 3988', 'dtran@fakemail.com', '2'),
('15', 'gvee', 'George', 'Vee', '$2a$10$jQwC3qbd3ZQ.AZ6AEqQ5gOJ5.jodFlvIsso0RTTVcKj4nUkJoyYvu', '(09) 4872 7834', 'gvee@fakemail.com', '2'),
('16', 'rlopez', 'Rose', 'Lopez', '$2a$10$M8.q8TW55eEHzkKl1ImZpeJ7WJUadgbpKbnl445UeW593uqEOl/r.', '(09) 6290 7889', 'rlopez@fakemail.com', '2'),
('17', 'akour', 'Anand', 'Kour', '$2a$10$4c4tRsUOFYw1ZGxMNP8uLO81kW2K8lP04AOEIPbem0et4G5xua/rG', '(09) 9415 1179', 'akour@fakemail.com', '2'),
('18', 'slee', 'Shannon', 'Lee', '$2a$10$DC4z3chiekezL8or9LjtR.Rjd/QhN9vQQkSUp8N2KdX4RuE7HH2eG', '(09) 8256 6791', 'slee@fakemail.com','2'),
('19', 'sgray', 'Scott', 'Gray', '$2a$10$.yHRX5qVro.bmCP7quW4G.t/CWSzxxd5x8sm70KdudJvTE9W/Yxoy', '(09) 4742 8675', 'sgray@fakemail.com', '2'),
('20', 'jperry', 'James', 'Perry', '$2a$10$QkcOaSVit/rxE207WbNo9.KL/YWeqeNUJqqCCPIL8VBOctx1HkXfq', '(09) 5232 0583', 'jperry@fakemail.com', '2'),
('30', 'klee', 'Kevin', 'Lee', '$2a$10$O/yoEY9MdI98lIA3cfKCmOH7ghVSS54sKEPkI84onrr23hprhG4z.', '(09) 5750 4337', 'klee@fakemail.com', '3');

INSERT INTO `Grades` (`id`,`name`) VALUES 
('1','Prep'), 
('2','Grade 1'),  
('3','Grade 2'), 
('4','Grade 3'),
('5','Grade 4'),
('6','Grade 5'),
('7','Grade 6');

INSERT INTO `Ratings` (`id`,`name`) VALUES 
('1','A'), 
('2','B'),  
('3','C'), 
('4','D'),
('5','E');

INSERT INTO `Subjects` (`id`,`name`) VALUES 
('1','Arts'), 
('2','Drama'),   
('3','French'), 
('4','Health'), 
('5','Maths'), 
('6','Physical Education'), 
('7','Play Based'), 
('8','Reading'), 
('9','Science'),
('10','Writing');

INSERT INTO `GradeSubjects` (`SubjectId`,`GradeId`) VALUES 
('1','1'), ('2','1'), ('3','1'), ('4','1'), ('5','1'), 
('6','1'), ('7','1'), ('8','1'), ('9','1'),('10','1'),
('1','2'), ('2','2'), ('3','2'), ('4','2'), ('5','2'), 
('6','2'), ('7','2'), ('8','2'), ('9','2'),('10','2'),
('1','3'), ('2','3'), ('3','3'), ('4','3'), ('5','3'), 
('6','3'), ('7','3'), ('8','3'), ('9','3'),('10','3'),
('1','4'), ('2','4'), ('3','4'), ('4','4'), ('5','4'), 
('6','4'), ('7','4'), ('8','4'), ('9','4'),('10','4'),
('1','5'), ('2','5'), ('3','5'), ('4','5'), ('5','5'), 
('6','5'), ('7','5'), ('8','5'), ('9','5'),('10','5'),
('1','6'), ('2','6'), ('3','6'), ('4','6'), ('5','6'), 
('6','6'), ('7','6'), ('8','6'), ('9','6'),('10','6'),
('1','7'), ('2','7'), ('3','7'), ('4','7'), ('5','7'), 
('6','7'), ('7','7'), ('8','7'), ('9','7'),('10','7');

INSERT INTO `Class` (`id`,`name`, `GradeId`, `TeacherId`) VALUES 
('1','Prep A','1',NULL),
('2','Prep B','1',NULL),
('3','Prep C','1',NULL),
('4','1 A','2',NULL), 
('5','1 B','2',NULL), 
('6','1 C','2',NULL), 
('7','1 D','2',NULL), 
('8','2 A','3',NULL), 
('9','2 B','3',NULL), 
('10','2 C','3',NULL), 
('11','3 A','4',NULL), 
('12','3 B','4',NULL), 
('13','3 C','4',NULL), 
('14','4 A','5',NULL), 
('15','4 B','5',NULL), 
('16','4 C','5',NULL), 
('17','5 A','6',NULL), 
('18','5 B','6',NULL), 
('19','6 A','7',NULL), 
('20','6 B','7',NULL);

INSERT INTO `TeacherClassSubjects` (`TeacherId`,`SubjectId`,`ClassId`) VALUES 
('1','1','1'),('1','1','2'),('1','1','3'),('1','1','4'),('1','1','5'),
('1','1','6'),('1','1','7'),('1','1','8'),('1','1','9'),('1','1','10'),
('2','9','11'),('2','9','12'),('2','9','13'),('2','9','14'),('2','9','15'),
('2','9','16'),('2','9','17'),('2','9','18'),('2','9','19'),('2','9','20'),
('3','4','8'),('3','5','8'),('3','7','8'),('3','8','8'),('3','10','8'),
('4','4','14'),('4','5','14'),('4','7','14'),('4','8','14'),('4','10','14');

INSERT INTO `StudentClass` (`StudentId`,`ClassId`) VALUES 
('10','2'),('11','2'),('12','2'),('13','2'),('14','2'),('15','2'),
-- ('10','8'),('11','8'),('12','8'),('13','8'),('14','8'),('15','8'),
('16','14'),('17','14'),('18','14'),('19','14'),('20','14');
