const mongoose = require("mongoose");

const connectionStr = ()=>{
mongoose.connect(process.env.DB_url)
.then((data)=>{
    console.log(`Mongodb connected with server:${data.connection.host}`);
})
}

module.exports = connectionStr;





