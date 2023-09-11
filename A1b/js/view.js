"use strict";

//This file contains code that will display a selected student info including: student name, student ID and student problem

//Task 12
//Retrieving the index values of student index and student queue index
let studentIndex = localStorage.getItem(STUDENT_INDEX_KEY);
let studentQueueIndex = localStorage.getItem(STUDENT_QUEUE_KEY);
console.log(studentIndex)
 
//Retrieving data based on the retrieved student index and student queue index
let output = consultSession.getStudent(studentQueueIndex, studentIndex);
console.log(output)

//Displaying the student's full name, student's ID and student's problem at the appropriate areas
document.getElementById("studentName").innerHTML = output._fullName;
document.getElementById("studentID").innerHTML = output._studentId;
document.getElementById("problem").innerHTML = output._problem;
    

