SELECT *
 FROM `348-project-production`.users AS user 
 WHERE user.email = 'JulieTighe@gmail.com';

-- improve by creating index
CREATE INDEX emailIdx ON `348-project-production`.users(email);
DROP INDEX emailIdx on `348-project-production`.users;