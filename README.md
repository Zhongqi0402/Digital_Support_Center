# cs348_project

We have set up the MySQL database on the local machine and are able to interact with it using either MySql workbench or command line. The backend Component uses MVC (Model-View-Controller) model, where the MVC of each route can be found under `backend/routes`

### Create and Load to Sample Database

1. In local mySQL Work Bench, be sure to have a local instance running
2. Connect to the local instance
3. Create a Schema with character set of `utf8mb4`, collation of `utf8mb4_0900_ai_ci` and any name of your choice
4. In `database.ts` file under `/backend/`, be sure to replace `348-project` with the name of the schema you just created, replace `root` and `Uforse2020!` with `User` and `Password` that you used to connect to your local instance
5. In a terminal with the project folder, do `cd backend`
6. run `npm run dev` and npm will take care of creating the table by running codes in `/backend/server.ts`

### SQL Code

The backend component uses nodeJS with Sequelize ORM for communicating with dataabse. 
- Direct SQL queries for basic features can be found under `backend/sqlQueries`. 
- Typescript with Sequelize to create tables from sample data can be found in `backend/server.ts`
- Other functional ORM code can be found in `Controller` file under `backend/routes` with different routes. 

### SQL for Creating Tables and inserting sample data

Typescript code for reading csv and insert sample data to database be found in `backend/server.ts` and the SQL can be found in `backend/createDB/create.sql` file. Table definitions has a name of Model.ts and they can be found in `backend/routes` under different routes.


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
