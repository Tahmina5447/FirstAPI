const express=require("express");
const app =express();
const cors =require('cors');

const usersRouter=require("./routes/v1/user.route.js")

app.use(cors());
app.use(express.json());

app.use("api/v1/user",usersRouter)
app.listen(5000,()=>{
    console.log("server running on port 5000");
})



