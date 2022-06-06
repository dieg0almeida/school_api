const express = require('express');
const route = express.Router();

const StudentController = require("./app/controllers/StudentController");
const SubjectController = require("./app/controllers/SubjectController");
const AssignmentController = require("./app/controllers/AssignmentController");

//Students routes
route.get('/api/students', StudentController.index);
route.get('/api/students/:id', StudentController.show);
route.post('/api/students', StudentController.post);
route.put('/api/students/:id', StudentController.put);
route.delete('/api/students/:id', StudentController.delete);
route.post('/api/students/search', StudentController.search);


//Subjects routes
route.get('/api/subjects', SubjectController.index);
route.get('/api/subjects/:id', SubjectController.show);
route.post('/api/subjects', SubjectController.post);
route.put('/api/subjects/:id', SubjectController.put);
route.delete('/api/subjects/:id', SubjectController.delete);
route.post('/api/subjects/search', SubjectController.search);

//Assignment routes
route.get('/api/assignments', AssignmentController.index);
route.post('/api/assignments', AssignmentController.post);
route.delete('/api/assignments/:id', AssignmentController.delete);


module.exports = route;