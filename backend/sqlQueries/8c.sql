UPDATE `348-project-production`.tickets 
	SET description= "new description",
		status= "closed",
        updatedAt= now() 
	WHERE id = 3;
    
-- Testing
SELECT * FROM `348-project-production`.tickets 
	WHERE id = 3;