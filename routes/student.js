const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");

//Student routes
const studentController = require('../controllers/student')

router.post('/',auth,studentController.createStudent);
router.get('/',auth, studentController.getAllStudents);
router.get('/:id',auth, studentController.getOneStudent);
router.put('/:id',auth, studentController.updateOneStudent);
router.delete('/:id',auth, studentController.deleteOneStudent);



module.exports = router;