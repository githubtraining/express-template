const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
app.use(bodyParser.json());

let database = {
  assignments: [],
  students: [],
  grades: {},
}


app.get('/assignments', (req, res) => {
  res.send({assignments: database.assignments});
});

app.post('/assignments', (req, res) => {
  const {assignmentName} = req.body;
  database.assignments.push(assignmentName);
  res.send("success");
})

app.get('/students', (req, res) => {
  res.send({students: database.students});
});

app.post('/students', (req, res) => {
  const {studentName} = req.body;
  database.students.push(studentName);
  res.send("success");
})

app.get('/grades', (req, res) => {
  res.send({grades: database.grades});
});

app.post('/grades', (req, res) => {
  const {gradesUpdate} = req.body;
  database.grades = gradesUpdate;
  res.send("success");
})

app.listen(port, () => console.log(`Listening on port ${port}`));

