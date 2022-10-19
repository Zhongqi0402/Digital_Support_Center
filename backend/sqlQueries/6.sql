INSERT INTO `348-project`.users (id, name, email, password, isAdmin, createdAt, updatedAt) 
VALUES (DEFAULT,
		"Andrew", 
		"andrew@gmail.ca", 
		"123456", 
		DEFAULT,
		NOW(),
		NOW());

-- Testing for result
SELECT * FROM `348-project`.users;