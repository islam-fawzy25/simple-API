const express = require("express");
const app = express();


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/api/students",require("./api/students"))
app.use("/api/teachers",require("./api/teachers"))




app.listen(5000,()=>{
    console.log("server run on port 5000");
})

module.exports = app
