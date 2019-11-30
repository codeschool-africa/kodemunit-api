const express = require('express');
const Student = require('../models/student')
const router = express.Router();

//Student routes
const studentController = require('../controllers/student')

router.post('/',studentController.createStudent);
router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getOneStudent);
router.put('/:id', studentController.updateOneStudent);
router.delete('/:id', studentController.deleteOneStudent);



module.exports = router;