const app = require('./app.js');
const dotenv = require('dotenv');
const {connectDatabase} = require('./config/database');

// Handling Uncaught Execption
process.on('uncaughtException', (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Execption`);
    process.exit(1);
});

// config
dotenv.config({path:"backend/config/config.env"});

// connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, ()=> {
    console.log(`Server is listening on http://localhost:${process.env.PORT}`);
});

// unhandled promise rejections
process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(error)
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    });
});