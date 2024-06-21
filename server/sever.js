const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express()
const cors = require("cors")
const routes = require ("./route/route")


app.use(express.json());
app.use(cors())
app.use('/',routes)

mongoose.connect("mongodb://localhost:27017/Office")
        .then(()=> {
            console.log("db connected");
        })
        .catch((error)=>{
            console.log(error);
        })

app.listen(3001,()=>{
    console.log("server running");
})