const express = require("express")
const router = express.Router()

const homeworks = require("../database/homeworks")

router.get("/", async (req, res) => {
    try {
        //Filter by assignment name
        if ("assignmentName" in req.query) {
            const queryAssignmentName = req.query.assignmentName.toLocaleLowerCase();
            const filterByAssignmentName = homeworks.filter(homework => homework.assignmentName.toLocaleLowerCase() == queryAssignmentName)
            return res.status(200).json(filterByAssignmentName)
        }
        //Filter by individual student name
        if ("studentName" in req.query) {
            const queryStudentName = req.query.studentName.toLocaleLowerCase();
            const filterBystudentName = homeworks.filter(homework => homework.studentName.toLocaleLowerCase() == queryStudentName)
            return res.status(200).json(filterBystudentName)
        }
        //Filter by date 
        if ("startDate" in req.query) {
            const queryStartDate = new Date(req.query.startDate);
            const filterByStartDate = homeworks.filter((homework) => {
                const formatSubmissionDate = new Date(homework.submissionDate).getTime()
                return formatSubmissionDate >= queryStartDate.getTime()
            })
            res.status(200).json(filterByStartDate)
            return
        }

        if ("endDate" in req.query) {
            const queryEndDate = new Date(req.query.endDate);
            const filterByEndDate = homeworks.filter((homework) => {
                const formatSubmissionDate = new Date(homework.submissionDate).getTime()
                return formatSubmissionDate <= queryEndDate.getTime()
            })
            res.status(200).json(filterByEndDate)
            return
        }
        //or overview of all homework submissions
        res.status(200).json(homeworks)
        return
    } catch (err) {
        response.status(500).send({ error: 'Something went wrong' })
        throw err
    }
})

// Grade individual homework submissions and add comments
router.put("/:id", async (req, res) => {
    try {
        const homeWorkId = parseInt(req.query.homeworkId);
        const teacherId = parseInt(req.params.id)
        if (isNaN(teacherId) || isNaN(homeWorkId)) {
            return res.status(400).send({ error: "Id must be integers" });
        }

        const isFoundHomeWork = homeworks.find((homework) => {
            return homework.id === homeWorkId
        })
        console.log(isFoundHomeWork);

        if (isFoundHomeWork === undefined) {
            return res.status(404).send({ error: "Not available homework" });
          }

        if (isFoundHomeWork) {
            isFoundHomeWork.teacher_id = teacherId;
            isFoundHomeWork.grading = new Date();
            isFoundHomeWork.finalGrade = req.body.finalGrade;
            isFoundHomeWork.teacherNotes = req.body.teacherNotes;
            res.status(201).json(isFoundHomeWork)
            return
        }

    } catch (error) {
        res.status(500).send({ error: 'Something went wrong' })
        throw error;
    }
})




module.exports = router;