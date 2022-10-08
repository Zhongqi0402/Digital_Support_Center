# cs348_project

We have set up the MySQL database on the local machine and are able to interact with it using either MySql workbench or command line.

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
