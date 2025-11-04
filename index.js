const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const nodemailer = require("nodemailer");


const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://mksamy:12345@cluster0.hh7j086.mongodb.net/sendgmail?appName=Cluster0").then(function () {
    console.log("connect to DataBase successfully")
}).catch(()=>console.log("database conected Failed"))


const credential = mongoose.model("credential", {}, "bulkmail")







app.post("/sendemail", function (req, res) {
    
    var msg = req.body.msg
    var emailList = req.body.emailList

    credential.find().then((data) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: data[0].toJSON().user,
            pass: data[0].toJSON().pass,
        },
    });

        new Promise(async function (resolve, reject) {
        
            try {
        
    for (var i = 0; i<emailList.length; i++)
    {

    await transporter.sendMail(
    {
        from: "mkaruppas477@gmail.com",
        to: emailList[i],
        subject: "A message is me send",
        text:msg
    }
        )
        console.log("email to send line to line",emailList[i])
    }

    resolve("success")
    }

    catch (error)
    {
        reject(fail)
    }

        
    }).then(function ()
    {
        res.send(true)
    }).catch(function () {
    res.send(false)
})
    
}).catch((error) =>
{
    console.log(error)
})
    



  
})

app.listen(5000, function ()
{
    console.log("server strated")
})