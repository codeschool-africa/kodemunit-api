const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

//solving corse errors 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('/api/student', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Thing created successfully!'
    });
});


app.use('/api/student', (req, res, next) => {
    const stuff = [
        {
            _id:1,
            first_name: "justine",
            second_name: "Peterson",
            date_of_birth: 1/2/1993,
            mobile: 0987654321,
            email: "justine@peterson.com"
        },
        {
            _id: 2,
            first_name: "Peterson",
            second_name: "Lim",
            date_of_birth: 1 / 2 / 1993,
            mobile: 0987654321,
            email: "justine@peterson.com"
        }
    ];
    res.status(200).json(stuff);
});

module.exports = app;