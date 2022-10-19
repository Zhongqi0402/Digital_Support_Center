# cs348_project

We have set up the MySQL database on the local machine and are able to interact with it using either MySql workbench or command line. The backend Component uses MVC (Model-View-Controller) model, where the MVC of each route can be found under `backend/routes`

### C1. Create and Load to Sample Database

1. In local mySQL Work Bench, be sure to have a local instance running
2. Connect to the local instance
3. Create a Schema with character set of `utf8mb4`, collation of `utf8mb4_0900_ai_ci` and any name of your choice
4. In `database.ts` file under `/backend/`, be sure to replace `348-project` with the name of the schema you just created, replace `root` and `Uforse2020!` with `User` and `Password` that you used to connect to your local instance
5. In a terminal with the project folder, do `cd backend`
6. run `npm run dev` and npm will take care of creating the table by running codes in `/backend/server.ts`

### C1. Features it currently supports
1. Register a user to the database
2. Check if a user exists in the database
3. Update a ticket into the database
4. Delete a ticket from the database


### C2. SQL for Creating Tables and inserting sample data

Typescript code for reading csv and insert sample data to database be found in `backend/server.ts` and the SQL can be found in `backend/createDB/create.sql` file. Table definitions has a name of Model.ts and they can be found in `backend/routes` under different routes. There are functions in `server.ts` file for checking if tables in local database are empty or not. If the user table is empty locally, then it will populate data from csv files into the database.

### C3. SQL Code

The backend component uses nodeJS with Sequelize ORM for communicating with dataabse. 
- Direct SQL queries for basic features can be found under `backend/sqlQueries`. 6.sql, 7.sql, 8.sql, 9.sql are ordered by Feature number R6, R7, R8, R9 respectively.
- Output Of each corresponding sql queries are saved as `feature number.out.csv`.
- Typescript with Sequelize to create tables from sample data can be found in `backend/server.ts`
- Other functional ORM code can be found in `Controller` file under `backend/routes` with different routes. 



# Backend Component

### External Framework

- express
- express-async-handler
- dotenv
- jsonwebtoken
- sequelize
- socket.io

### Comiple and Start

run `npm build` first, and then `npm run dev`. Note that by default, the backend would start in `localhost:50000`. The compiled javascript code (from typescript) would be saved to `/backend/dist` folder.


### Code Organization

All backend requests are organized by routes. And Each route under the `routes` folder has three files. One for different requests under the big route, and a controller file and a model file to add functionalities.
