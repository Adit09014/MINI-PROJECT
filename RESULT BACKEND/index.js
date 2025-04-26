const express = require("express");
const { User } = require("./db");
const {Admin}= require("./db/admin");
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

mongoose.connect("mongodb+srv://adit09014:Shrestha%400007@cluster0.fuycr.mongodb.net/cbse1")
  .then(() => console.log("Database connected"))
  .catch(err => console.error("Database connection error:", err));

app.post('/fillResult', (req, res) => {
  const {
    rollno,
    name,
    mothername,
    fathername,
    dob,
    school,
    schoolId,
    subjectcode1, subjectname1, theory1, practical1, total1, totalinwords1, positionalgrade1,
    subjectcode2, subjectname2, theory2, practical2, total2, totalinwords2, positionalgrade2,
    subjectcode3, subjectname3, theory3, practical3, total3, totalinwords3, positionalgrade3,
    subjectcode4, subjectname4, theory4, practical4, total4, totalinwords4, positionalgrade4,
    subjectcode5, subjectname5, theory5, practical5, total5, totalinwords5, positionalgrade5,
    subjectcode6, subjectname6, theory6, practical6, total6, totalinwords6, positionalgrade6,
    result
  } = req.body;

  User.create({
    rollno,
    name,
    mothername,
    fathername,
    dob,
    school,
    schoolId,
    subjectcode1,
    subjectname1,
    theory1,
    practical1,
    total1,
    totalinwords1,
    positionalgrade1,
    subjectcode2,
    subjectname2,
    theory2,
    practical2,
    total2,
    totalinwords2,
    positionalgrade2,
    subjectcode3,
    subjectname3,
    theory3,
    practical3,
    total3,
    totalinwords3,
    positionalgrade3,
    subjectcode4,
    subjectname4,
    theory4,
    practical4,
    total4,
    totalinwords4,
    positionalgrade4,
    subjectcode5,
    subjectname5,
    theory5,
    practical5,
    total5,
    totalinwords5,
    positionalgrade5,
    subjectcode6,
    subjectname6,
    theory6,
    practical6,
    total6,
    totalinwords6,
    positionalgrade6,
    result
  })
    .then(() => {
      res.json({
        message: "Student Data created successfully."
      });
    })
    
});

app.use(cors({
  origin: /^(http:\/\/localhost:\d+)$/
}));

app.get('/students', async (req, res) => {
  const rollno = req.query.rollno;
  const schoolId = req.query.schoolId;

  if (!rollno || !schoolId) {
      return res.status(400).json({ error: "Roll Number and School ID are required" });
  }

  try {
      const student = await User.findOne({ rollno, schoolId });
      if (student) {
          res.json([student]);
      } else {
          res.status(404).json({ error: "Student not found" });
      }
  } catch (error) {
      res.status(500).json({ error: "Server error" });
  }
});

app.post('/Adminsignup', async (req, res) => {
  const username= req.body.username;
  const password=req.body.password;

  Admin.create({
      username:username,
      password:password
  })
  .then(() => {
    res.json({
      message: "Student Data created successfully."
    });
  })
});

app.post('/deleteStudent', async (req, res) => {
  const { rollno, schoolId } = req.body;

  if (!rollno || !schoolId) {
    return res.status(400).json({ error: "Roll Number and School ID are required" });
  }

  try {
    const deletedStudent = await User.findOneAndDelete({ rollno, schoolId });

    if (deletedStudent) {
      res.json({ message: "Student record deleted successfully" });
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post('/AdminLogin', async (req, res) => {
  const { username, password } = req.body; 

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    const admin = await Admin.findOne({ username, password });

    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post('/AdminUpdate', async (req, res) => {
  const { rollno, schoolId, field, value } = req.body;

  try {
      const updatedUser = await User.findOneAndUpdate(
          { rollno, schoolId }, 
          { [field]: value }, 
          { new: true } 
      );

      if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
      res.status(500).json({ message: "Server error", error });
  }
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;
