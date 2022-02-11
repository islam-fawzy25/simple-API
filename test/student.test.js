const chai = require("chai")
const server = require("../server/index")
const chaiHttp = require("chai-http");
// module.exports = server

chai.use(chaiHttp)
chai.should();

// Student Api 
describe("Student API", () => {
    // Get route
    it("It should GET all homework for one  student", (done) => {
        chai.request(server)
            .get("/api/students/" + 1)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a("Array")
                done();
            })
    })

    // POsT route
    it("It should Post homework ", (done) => {
        const newHomework = {
            assignmentName: "Math",
            file: "Word",
            grading: null,
            finalGrade: "ungraded",
            teacherNotes: null
        }
        chai.request(server)
            .post("/api/students/" + 1)
            .send(newHomework)
            .end((err, res) => {
                res.should.have.status(201)
                 res.body.should.have.property('id')
                 res.body.should.have.property('teacher_id')
                 res.body.should.have.property('student_id')
                 res.body.should.have.property('studenName')
                 res.body.should.have.property('assignmentName')
                 res.body.should.have.property('submissionDate')
                 res.body.should.have.property('file')
                 res.body.should.have.property('grading')
                 res.body.should.have.property('finalGrade')
                 res.body.should.have.property('teacherNotes')
                 newHomework.assignmentName.should.be.a('string')
                 newHomework.file.should.be.a('string')
                 newHomework.finalGrade.should.be.a('string')

                res.body.should.be.a("Object")
                done();
            })
    })

})



