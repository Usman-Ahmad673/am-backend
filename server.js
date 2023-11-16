const app = require('./app')
const connectDatabase = require('./config/database')




//Handling Uncaught Exception
process.on('uncaughtException',(err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
        process.exit(1)
})


//Connecting to Database
connectDatabase()








const server = app.listen(8000 , () => {
    console.log(`Server is working on http://localhost:8000`);
})






//Unhandled Promise Rejection
process.on('unhandledRejection' , err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhangled Promise Rejection`);

    server.close(() => {
        process.exit(1)
    })
})