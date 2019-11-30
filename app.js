const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const Student = require('./models/student')
const app = express();

dotenv.config();
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });

app.use(bodyParser.json());

//solving corse errors 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//sending student information to the database
app.post('/api/student', (req, res, next) => {
    const student = new Student({
        first_name: req.body.first_name,
        second_name: req.body.second_name,
        date_of_birth: req.body.date_of_birth,
        mobile: req.body.mobile,
        email: req.body.email,
        studentId: req.body.studentId
    });
    student.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

//getting all the students details
app.get('/api/student', (req, res, next) => {
    Student.find().then(
        (students) => {
            res.status(200).json(students);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

//getting a single students details
app.get('/api/student/:id', (req, res, next) => {
    Student.findOne({
        _id: req.params.id
    }).then(
        (student) => {
            res.status(200).json(student);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
});

module.exports = app;