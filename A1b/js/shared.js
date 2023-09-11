"use strict";

//This files declares the Student and Session class, with all required accessors, mutators and methods. 
//This file also possesses several functions dealing with local storage, such as checking for data, storing and getting data from local storage

// Keys for localStorage
const STUDENT_INDEX_KEY = "studentIndex";
const STUDENT_QUEUE_KEY = "queueIndex";
const APP_DATA_KEY = "consultationAppData";

//Task 1
//Student Class
class Student
{
    //Constructor for Student class
    constructor(fullName, studentId, problem)
    {
        this._fullName = fullName;
        this._studentId = studentId;
        this._problem = problem;
    }

    //Accessor for Student's Full Name
    get fullName()
    {
        return this._fullName;
    }
    //Accessor for Student's ID
    get studentId()
    {
        return this._studentId;
    }
    //Accessor for Student's problem
    get problem()
    {
        return this.problem;
    }

    //FromData method to convert data retrieved from local storage into instance of student class
    fromData(studentData)
    {
        this._fullName = studentData._fullName;
        this._studentId = studentData._studentId;
        this._problem = studentData._problem;
    }

}

//Session Class
class Session
{
    //Constructor of Session class
    constructor()
    {

        this._startTime = new Date();
        this._queue = [];

    }
    //Acessor to get Starting time of current session
    get startTime()
    {
        return this._startTime.toLocaleString();
    }
    //Acessor for consultation session queue
    get queue()
    {
        return this._queue;
    }
    //Method to push empty array into this._queue 
    addSubQueue()
    {
        this._queue.push([]);
    }
    //Method to add a student along with student info into the longest queue
    addStudent(fullName,studentId,problem)
    {
        //set us a minimum length
        let minimumLength = this.queue[0].length;
        //declaring a variable to store the index with the longest array
        let queueIndex = 0;
        //declaring a variable which stores student info as an instance of the student class
        let insertQueue = new Student (fullName,studentId,problem);
        //Validation to check for the longest array in this._queue
        for (let i =0; i < this._queue.length; i++)
        {
            //if the length of the array is longer than the last, then update queueIndex with the new index
            if(this._queue[i].length < minimumLength)
            {

                minimumLength = this._queue[i].minimumLength;
                queueIndex = i;

            }

        }
        //New student instance is pushed into the subarray with the longest length
        this._queue[queueIndex].push(insertQueue);

    }
    //Method to remove a student from a queue based on the student index and the queue index
    removeStudent(index, queueindex)
    {
        this._queue[queueindex].splice(index, 1);
    }
    //Method to retrieve student info from this._queue
    getStudent(index, queueindex)
    {
        return this._queue[queueindex][index];
    }
    //FromData method to convert data retrieved from local storage into instance of session class
    fromData(sessionData)
    {
        let data = sessionData._queue;
        this._queue = [];
        for ( let i =0; i<data.length; i++)
        {
            this._queue.push([])

            for (let j =0; j<data[i].length; j++)
            {
                let student = new Student();
                student.fromData(data[i][j]);
                this._queue[i].push(student);
            }
            
        }
    }
}
//Task 2
//This function, checkForData(), checks if local storage with a specific key if data is present. Parameters used in this function is key
//if data is present then this function will return a true value else it will return a false value
function checkForData(key)
{
    if (localStorage.getItem(key) === null)
    {
        return false;
    }
    else 
    {
        return true;
    }
}
//Task 3
//Function updateLocalStorage() is used to update local storage with selected data at a specific key. Parameters used are key and data
function updateLocalStorage(key, data)
{
    let jsonString = JSON.stringify(data);

    localStorage.setItem(key, jsonString);
}
//Task 4
//Function getData() is used to get data from local storage with specific key. Parameters used are key
function getData(key)
{
    let jsonString = localStorage.getItem(key);
    let objectData = jsonString;
    try
    {
        //Converting data from string form to original form
        objectData = JSON.parse(jsonString);
    }
    catch (error)
    {
        //Error message in case no data is detected
        console.log("no data");
    }
    finally
    {
        //Regardless of outcome, objectData should be returned
        return objectData;
    }
    
    
}

//Task 5
//Process that runs when the page loads
let consultSession = new Session();
//Checking if there is data in APP_DATA_KEY
if (checkForData(APP_DATA_KEY) === true)
{
    //If there is data in APP_DATA_KEY then data should be retrieved and made into an instance of Session class
    let objectData = getData(APP_DATA_KEY);
    consultSession.fromData(objectData);
}
else
{
    //If no data is in APP_DATA_KEY then two empty queues into this._queue then local storage should be updated so that it contains only empty subarrays
    consultSession.addSubQueue();
    consultSession.addSubQueue();
    updateLocalStorage(APP_DATA_KEY, consultSession);
}


