"use strict";

//This file is used to add students to the consultation queue, this file mainly deals with the validation for input then adds the student info if all inputs are valid

//Task 6
//Function addStudent() is used to to add student info only if it passes validation
function addStudent()
{
    //Adding a constant that will be used as a format check
    const regex = /^[1-3]{1}[0-9]{7}$/;

    //Retriving data inputted in the html page for information such as student name, student ID, student problem
    let fNameRef = document.getElementById("fullName");
    let fName = fNameRef.value;
    let studentIDRef = document.getElementById("studentId");
    let studentID = studentIDRef.value;
    let problemRef = document.getElementById("problem");
    let problem = problemRef.value;
    
    //Presetting variable which will be used to ensure all values inputted are valid
    let valid = true;
    //Validation to check if the student ID inputted matches the format declared on line 6
    let studentIDValidation = studentID.match(regex);
    //Presence check for student name input
    if (fName == "")
    {   
        document.getElementById("fullName_msg").innerText = "Please enter a name";
        valid = false;
    }
    //Presence check for student ID input
    if (studentID == "")
    {
        document.getElementById("studentId_msg").innerText = "Please enter a studentID";
        valid = false;
    }
    //Format check to if student input matches the format
    else if (studentIDValidation == null)
    {
        document.getElementById("studentId_msg").innerText = "Please enter valid StudentID";
        valid = false;
    }
    //Presence check for student problem input
    if (problem == "")
    {
        document.getElementById("problem_msg").innerText = "Please state your problem";
        valid = false;
    }
    //If any of the inputs are invalid then this function will cease
    if (valid == false)
    {
        return;
    }

    //If all inputs are valid then all inputs are added as an instance of student class
    consultSession.addStudent(fName,studentID,problem);
    //Local storage is updated with new data which was just inputted
    updateLocalStorage(APP_DATA_KEY, consultSession);
    //Notify user that student has been successfully added to the queue
    alert("Student has been successfully been added to the queue");
    //Divert users to index.html page
    window.location ="index.html";

}
