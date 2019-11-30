const express = require('express');
const Student = require('../models/student')

const router = express.Router();


//sending student information to the database
router.post('/', (req, res, next) => {
    const student = new Student({
        first_name: req.body.first_name,
        second_name: req.body.second_name,
        date_of_birth: req.body.date_of_birth,
        mobile: req.body.mobile,
        email: req.body.email
    });
    student.save().then(
        () => {
            res.status(201).json({
                message: 'Student saved successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error.errmsg
            });
        }
    );
});

//getting all the students details
router.get('/', (req, res, next) => {
    Student.find().then(
        (students) => {
            res.status(200).json(students);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error.errmsg
            });
        }
    );
});

//getting a single students details
router.get('//:id', (req, res, next) => {
    Student.findOne({
        _id: req.params.id
    }).then(
        (student) => {
            res.status(200).json(student);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error.errmsg
            });
        }
    );
});


//Update student information 
router.put('//:id', (req, res, next) => {
    const student = new Student({
        first_name: req.body.first_name,
        second_name: req.body.second_name,
        date_of_birth: req.body.date_of_birth,
        mobile: req.body.mobile,
        email: req.body.email,
        studentId: req.body.studentId
    });
    Student.updateOne({ _id: req.params.id }, student).then(
        () => {
            res.status(201).json({
                message: 'Updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error.errmsg
            });
        }
    );
});

//Deleting one student
router.delete('//:id', (req, res, next) => {
    Student.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({
                message: 'Student Deleted!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error.errmsg
            });
        }
    );
});



module.exports = router;