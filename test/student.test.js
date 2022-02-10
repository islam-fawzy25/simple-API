const chai = require("chai")
const server = require("../server/index")
const chaiHttp = require("chai-http")
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
                res.body.should.be.a("array")
                done();
            })
    })

    // POsT route
    it("It should Post  homework ", (done) => {
        const newHomework = {
            teacher_id: "0",
            assignmentName: "It",
            submissionDate: "2022-02-20",
            file: "My homework",
            grading: "00 -00 - 0000",
            finalGrade: "ungraded",
            teacherNotes: "----"
        }
        chai.request(server)
            .post("/api/students/" + 1)
            .send(newHomework)
            .end((err, res) => {
                res.should.have.status(201)
                res.body.should.be.a("array")
                done();
            })
    })

})



