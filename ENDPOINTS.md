### Endpoints 
School's database and routes stored inside routes folder, -Backend run on port = "5000" start with  "/api " 
-Student API routes: " http://localhost:5000/api/students/:id "
 -for an individual student to avoid mistakes between students when they submit their homework.
 -Query filters: 
  - grade = (A - F, incomplete, ungraded) 
  - assignment name = (Math, Danish, English, It)
 - Post their homework with two fields => file and subject = assignment name.
-Teachers API routes: " http://localhost:5000/api/teachers "
 -Teachers can overview all students homework and modify their homework to add a grade and leave a comment.
 -Query filters:  assignmentName, date range = (startDate , endDate), and studentName





