INSERT INTO `348-project-production`.users (id, name, email, password, isAdmin, createdAt, updatedAt) 
VALUES (DEFAULT,
		"Andrew", 
		"test@gmail.ca", 
		"123456", 
		DEFAULT,
		NOW(),
		NOW());

-- Testing for result
SELECT * FROM `348-project-production`.users where email = "test@gmail.ca";