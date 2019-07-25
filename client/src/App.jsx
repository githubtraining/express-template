import React from "react";
import Table from "./Table";
import List from "./List";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonClicked: "",
      assignments: [],
      students: [],
      grades: {}
    };

    this.handleButtonClicked = this.handleButtonClicked.bind(this);
    this.addAssignment = this.addAssignment.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.addGrade = this.addGrade.bind(this);
  }

  componentDidMount() {
    this.getAssignments();
    /* Add function calls */
  }

  async getAssignments() {
    const response = await fetch("/assignments");
    const body = await response.json();
    this.setState({ assignments: body.assignments });
  }

  /*Add functions*/

  handleButtonClicked(buttonName) {
    this.setState({
      buttonClicked: buttonName
    });
  }

  async addAssignment(assignmentName) {
    const response = await fetch("/assignments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        assignmentName
      })
    });
    this.setState({
      assignments: this.state.assignments.concat(assignmentName)
    });
  }

  async addStudent(studentName) {
    /*make a post request*/
    this.setState({ students: this.state.students.concat(studentName) });
  }

  addGrade(assignment, student, score) {
    let grades = this.state.grades;
    let assignmentName = assignment;
    let studentName = student;
    if (!(assignment in grades)) {
      grades[assignmentName] = {};
    }
    grades[assignmentName][studentName] = score;
    this.setState({ grades: grades });
  }

  async saveGrades() {
    /*make a post request*/
    let grades = this.state.grades;
  }

  render() {
    let tabChoice = <div />;

    if (this.state.buttonClicked === "assignments") {
      tabChoice = (
        <List
          placeholder="Add Assignment..."
          currList={this.state.assignments}
          addFunction={this.addAssignment}
          title="Assignments"
        />
      );
    }

    if (this.state.buttonClicked === "students") {
      tabChoice = (
        <List
          placeholder="Add Student..."
          currList={this.state.students}
          addFunction={this.addStudent}
          title="Student Roster"
        />
      );
    }

    if (this.state.buttonClicked === "grades") {
      tabChoice = (
        <div>
          <Table
            tableNames={this.state.assignments}
            rows={this.state.students}
            addFunction={this.addGrade}
            data={this.state.grades}
          />
          <form
            onSubmit={this.saveGrades}
            className="d-flex flex-justify-center pt-6"
          >
            <input
              className="btn btn-sm d-flex"
              type="submit"
              value="Save Grades"
            />
          </form>
        </div>
      );
    }

    return (
      <div>
        <div className="Box Box--spacious f4">
          <div className="Box-header">
            <h3 className="Box-title d-flex flex-justify-center">GradeBook</h3>
          </div>
        </div>
        <nav className="UnderlineNav d-flex flex-justify-center">
          <div className="UnderlineNav-body pt-6">
            <button
              className="btn btn-primary"
              onClick={() => this.handleButtonClicked("assignments")}
            >
              Assignments
            </button>
            <button
              className="btn btn-primary"
              onClick={() => this.handleButtonClicked("students")}
            >
              Students
            </button>
            <button
              className="btn btn-primary"
              onClick={() => this.handleButtonClicked("grades")}
            >
              Grades
            </button>
          </div>
        </nav>
        {tabChoice}
      </div>
    );
  }
}

export default App;
