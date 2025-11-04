const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("YOUR_MONGO_ATLAS_LINK")
  .then(() => console.log("MongoDB Connected"))
  .catch(() => console.log("Database Failed"));

const credential = mongoose.model("credential", {}, "bulkmail");

app.post("https://mern-bulk-mail-uvpu.vercel.app/sendemail", async (req, res) => {
  const { msg, emailList } = req.body;
  try {
    const data = await credential.find();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: data[0].toJSON().user,
        pass: data[0].toJSON().pass,
      },
    });

    for (let email of emailList) {
      await transporter.sendMail({
        from: "mkaruppas477@gmail.com",
        to: email,
        subject: "Bulk Mail App Message",
        text: msg,
      });
      console.log("Email sent:", email);
    }

    res.send(true);
  } catch (error) {
    console.error(error);
    res.send(false);
  }
});

app.listen(5000, () => console.log("Server started on port 5000"));
