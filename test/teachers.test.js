const chai =require("chai")
 const server = require("../server/index")
const chaiHttp = require("chai-http")

chai.use(chaiHttp)
chai.should();

describe("Teachers API",()=>{
    it("It should GET all homework all students",(done)=>{
        chai.request(server)
        .get("/api/teachers/")
        .end((err,res)=>{
            res.should.have.status(200)
            res.body.should.be.a("Array")
            done();
        })   
    })

    it("It should Edit homework for student",(done)=>{
        const gradeHomework ={
           teacher_id : "2",
            grading :"2022-02-02",
            finalGrade :"A",
            teacherNotes :"Good Test",
        }
        chai.request(server)
        .put("/api/teachers/2?homeworkId=5")
        .send(gradeHomework)
        .end((err,res)=>{
            gradeHomework.finalGrade.should.be.a('string')
            gradeHomework.teacherNotes.should.be.a('string')
            res.should.have.status(201)
            res.body.should.have.property('teacher_id')
            res.body.should.have.property('grading')
            res.body.should.have.property('finalGrade')
            res.body.should.have.property('teacherNotes')
            res.body.should.be.a("Object")
            done();
        })   
    })
})