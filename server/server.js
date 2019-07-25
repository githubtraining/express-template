const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
app.use(bodyParser.json());

let database = {
  assignments: ["Dummy Assignment 1", "Dummy Assignment 2"],
  students: ["Parth Shah", "Eric Pickup", "Elena Lape"],
  grades: {}
};

app.get("/assignments", (req, res) => {
  res.send({ assignments: database.assignments });
});

/*Add a get request for /students */

/*Add a get request for /grades*/


app.post("/assignments", (req, res) => {
  const { assignmentName } = req.body;
  database.assignments.push(assignmentName);
  res.send("success");
});

/*Add a post request for /students*/

/*Add a post request for grades*/

app.listen(port, () => console.log(`Listening on port ${port}`));
