const app = require("./app");
const dotenv = require("dotenv");
const connectionStr = require("./config/database");

dotenv.config({path:"backend/config/config.env"});
// db connection
connectionStr();

app.listen(process.env.PORT,()=>
{console.log(`server is running on http://localhost:${process.env.PORT}`)});