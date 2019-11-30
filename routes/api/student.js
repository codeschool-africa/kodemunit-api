const express = require("express");
const router = express.Router();
const Student = require("../../models/student");
const { check, validationResult } = require("express-validator");

router.post("/",(req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.send({
        errors: errors.array()
      });
      return;
    } else {
      // Data from form is valid.

      // Create an Student object with escaped and trimmed data.
      var student = new Student({
        first_name: req.body.first_name,
        second_name: req.body.second_name,
        date_of_birth: req.body.date_of_birth,
        mobile: req.body.mobile,
        email: req.body.email
      });
      student.save(function(err) {
        if (err) {
          return next(err);
        }
        // Successful - redirect to new student record.
        //res.redirect(student.url);
        res.send({ message: "stduent saved" });
      });
    }
  }
);

router.get("/", (req, res) => {
  res.json({ student: Student });
});

module.exports = router;
