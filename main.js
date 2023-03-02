const addTaskButonHandler = document.querySelector(".button-add-task");
const tasksDivHandler = document.querySelector(".tasks");
const inputAddTaskHandler = document.querySelector(".input-add-task");
const deleteTaskButonsHandler = document.querySelectorAll(".delete-task");
const datatimePickerHandler = document.querySelector("#datatime-picker-add-task");
let deadlineTask;
let timeToEndTask;
let days;
let hours;
let minutes;
let seconds;
let taskNumber = 0;
let taskArrays = [];
let intervalID;
const deleteTask = (button)=>{
    let buttonId;    
    buttonId = button.getAttribute("id").toString();
    taskArrays = taskArrays.filter(task=>task.taskId!=buttonId.slice(buttonId.length-1,buttonId.length));
        button.parentNode.remove();
    }


const clearInput = (input)=>{
    input.value = "";
}
const setDeadlineOfTask = (deadline)=>{
    deadlineTask = deadline;
}
const getDeadlineOfTask = ()=>{
    return deadlineTask;
}

const countTimeToEndDateForNow = (date)=>{
    const timeEnd = new Date(date).getTime()
    const timeNow = Date.now();
    let timeToEnd;
    let dateEnd = new Date(timeEnd - timeNow);
    timeToEnd = dateEnd.getTime();   
    return timeToEnd;
}
const setTimeToEndTask = (time) =>{
    timeToEndTask = time;
}

const getTimeToEndTask = ()=>{
    return timeToEndTask;
}

const setDays = (time)=>{
    days = Math.floor(time/86400000);
}

const getDays = ()=>{
    return days;
}

const setHours = (time)=>{
    hours = Math.floor((time - (getDays()*86400000))/3600000);
    setTimeToEndTask(time - (getDays()*86400000));
}

const getHours = ()=>{
    return hours;
}
const setMinutes = (time)=>{
    minutes = Math.floor((time - (getHours()*3600000))/60000);
    setTimeToEndTask(time - (getHours()*3600000));
}

const getMinutes = ()=>{
    return minutes;
}
const setSeconds = (time)=>{
    seconds = Math.floor((getTimeToEndTask() - (getMinutes()*60000))/1000);
}

const getSeconds = ()=>{
    return seconds;
}

const createTaskObject = (id, number, name, deadline,timeToEnd,
    days, hours, minutes,seconds)=>{
    taskObject = 
    {
        "taskId":id,
        "taskNumber":number,
        "taskName":name,
        "deadlineOfTask":deadline,
        "timeToEndTask":timeToEnd,
        "days":days,
        "hours":hours,
        "minutes":minutes,
        "seconds":seconds
    }

    return taskObject;
}

const updateTaskObject = (taskObject,timeToEnd,
    days, hours, minutes, seconds)=>{                
        taskObject.timeToEndTask = timeToEnd;
        taskObject.days = days,
        taskObject.hours = hours,
        taskObject.minutes = minutes;
        taskObject.seconds = seconds;
}
const updateTimeToEndTask = (date)=>
{
        setTimeToEndTask(countTimeToEndDateForNow(date));
        setDays(getTimeToEndTask());
        setHours(getTimeToEndTask())
        setMinutes(getTimeToEndTask())
        setSeconds(getTimeToEndTask())

}
const createHtmlElement = (elementName, id, className, htmlValue)=>{
    let htmlElement = document.createElement(elementName);
    htmlElement.setAttribute("id", id);
    htmlElement.setAttribute("class", className);
    htmlElement.innerHTML = htmlValue;

    return htmlElement;
}
const addTask = (taskContainer)=>{
    let div;
    let button;

    setDeadlineOfTask(datatimePickerHandler.value);
    updateTimeToEndTask(getDeadlineOfTask);
    addTaskNumber();    
    taskArrays.push(createTaskObject(
        getTaskNumber(),getTaskNumber(),"trening",getDeadlineOfTask(),
        getTimeToEndTask(), getDays(),getHours(),
        getMinutes(), getSeconds()                                                                                                                                                                                                                                                                                                                                                                
    ));
    div = createHtmlElement("div", "task", "task","");
    
    div.appendChild(createHtmlElement("p", "", "",inputAddTaskHandler.value));
    
    div.appendChild( createHtmlElement("p", "", ""
    ,"Data ukończenia zadania :"+getDeadlineOfTask()))
 
    div.appendChild(createHtmlElement("p", "timer-task-"+getTaskNumber(), ""
    ,"Do końca zadania pozostało "+getDays()+" Dni: "+getHours()+" Godzin: "+getMinutes()+" Minut: "+getSeconds()+" : Sekund "))

    button = createHtmlElement("button", "delete-task-button-"+getTaskNumber()
    , "button delete-task","usuń");
    button.addEventListener('click', ()=>deleteTask(button));
    div.appendChild(button)
    taskContainer.appendChild(div);
    clearInput(inputAddTaskHandler);    
};

const addTaskNumber = ()=>{
    taskNumber+=1;
}
const getTaskNumber = ()=>{
    return taskNumber;
}

addTaskButonHandler.addEventListener('click', ()=>{
    addTask(tasksDivHandler);
})

intervalID = setInterval(()=>{       
        taskArrays.forEach((task)=>{
            updateTimeToEndTask(task.deadlineOfTask)
            updateTaskObject(task, getTimeToEndTask(),
                getDays() , getHours(), getMinutes(), getSeconds())
            document.querySelector(`#timer-task-${task.taskId}`)
            .innerHTML = `Do końca zadania pozostało ${task.days}
             Dni: ${task.hours} Godzin: ${task.minutes}
            Minut: ${task.seconds} :Sekund${task.taskName}`;
        })

                    
},1000);
