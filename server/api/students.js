const express = require("express")
const router = express.Router()
const uuid = require("uuid") //provide unique id

const students = require("../database/students")
const homeworks = require("../database/homeworks")

router.get("/:id", async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    if (isNaN(studentId)) {
      return res.status(400).send({ error: "Id must be integers" });
    }

    // filter homeworks for individual student
    const individualStudent = homeworks.filter((homework) => {
      const foundStudent = homework.student_id === studentId
      return foundStudent
    })
    if (individualStudent[0] === undefined) {
      return res.status(404).send({ error: "Not available user" });
    }

    //Filter by grade
    if ("grade" in req.query) {
      // const grade = req.query.grade == "desc";
      // if we need to view homework filtered descending 
      const grade = req.query.grade.toLocaleLowerCase();
      const filterByGrade = individualStudent.filter(homework => homework.finalGrade.toLocaleLowerCase() === grade)
      return res.status(200).json(filterByGrade)
    }
    //Filter by assignment name
    if ("assignmentName" in req.query) {
      const queryAssignmentName = req.query.assignmentName.toLocaleLowerCase();
      const filterByAssignmentName = individualStudent.filter(homework => homework.assignmentName.toLocaleLowerCase() === queryAssignmentName)
      return res.status(200).json(filterByAssignmentName)
    }
    // filtered always with first query or grade even if grade comes seconde query ??!!
    //  Send individual homework submissions
    return res.status(200).json(individualStudent)
  } catch (err) {
    response.status(500).send({ error: 'Something went wrong' })
    throw err
  }
})

// Route allow student to submit homework
router.post("/:id", async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const studentData = students.find(student => student.id == studentId)
    const newHomework = {
      id: uuid.v4(),
      teacher_id: null,
      student_id: studentId,
      studenName: studentData.name,
      assignmentName: req.body.assignmentName,
      submissionDate: new Date(),
      file: req.body.file,
      grading: null,
      finalGrade: "ungraded",
      teacherNotes: null
    }

    homeworks.push(newHomework)
    res.status(201).json(newHomework)
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong' })
    throw error;
  }
})

module.exports = router;