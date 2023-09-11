"use strict";

//This file is used to execute the main functions for the current queue display. 
//This file has code which enables the dislpay of live clock, and students inside of each queue

//Task 7
//This function will be used to display the current time
function liveClock()
{
    //Identifies the current time and assign it to a variable
    let time = new Date().toLocaleTimeString();
    //Current time is displayed on the html page
    document.getElementById("currentTime").innerHTML = time;
}
//Task 8
//This function, view(), is used to assign student index and student queue index to appropriate keys. Parameters are index and queueIndex
function view(index, queueIndex)
{
    localStorage.setItem(STUDENT_INDEX_KEY, index);

    localStorage.setItem(STUDENT_QUEUE_KEY, queueIndex);
    //After setting items, user is directed to the view.html page
    window.location = "view.html";
}
//Task 9 
//Function markDone() is used to remove students from the queue when they are 'done'. Parameters used are index and queueIndex
function markDone(index, queueIndex)
{
    //Reconfirm whether user is sure they want to mark student as done and remove them from the queue
    let confirmation = confirm(`Do you intend to mark this student as 'done'?`);
    if (confirmation == true)
    {
        //If user confirms then student is removed from the queue and local storage
        consultSession.removeStudent(queueIndex,index) ;
        updateLocalStorage(APP_DATA_KEY,consultSession) ;
        //Updates the display from the page
        currentQueueStatus(consultSession.queue);
    } 

}
//Task 10
//Function currentQueueStatus is used to display the current queue status. Parameters accepted in this function is data
function currentQueueStatus(data) 
{
    //Declaring an empty string variable to store the output for later
    let display = "";
    //Iteration for every student info to allow them to be displayed 
    for (let i = 0; i < data.length; i++)
    {
        display += `<ul class="mdl-list"> <h4>Queue ${i + 1}</h4>`
        
        for (let j = 0; j < data[i].length; j++)
        {
            display += `<li class="mdl-list__item mdl-list__item--three-line">
            <span class="mdl-list__item-primary-content">
                <i class="material-icons mdl-list__item-avatar">person</i>
                <span>${data[i][j]._fullName}</span>
            </span>
            <span class="mdl-list__item-secondary-content">
                <a class="mdl-list__item-secondary-action" onclick="view(${i},${j})"><i
                        class="material-icons">info</i></a>
            </span>
            <span class="mdl-list__item-secondary-content">
                <a class="mdl-list__item-secondary-action" onclick="markDone(${i},${j})"><i
                        class="material-icons">done</i></a>
            </span>
        </li>`
        }

        display += `</ul>`
    }
    //Final output displayed in the html page
    document.getElementById("queueContent").innerHTML = display;
}

//Onload function that calls the following functions and processes when the page loads
window.onload = function()
{
    //Updates the time displayed with an interval of 1 second
    setInterval(liveClock,1000);
    //Displays all data (if any) on the the page
    currentQueueStatus(consultSession.queue) ;
}

