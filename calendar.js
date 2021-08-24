let today = new Date();
let today_year=today.getFullYear();
let today_month=today.getMonth();
let current_year=today.getFullYear();
let current_month=today.getMonth();
let beforeYear;
let beforeMonth;
let frontYear;
let frontMonth;
let day=document.getElementById('day-check');
let toDos ={};
day.innerText=`${today_year}년 ${today_month+1}월 ${today.getDate()}일`;
if (day.innerText in toDos){}else{
    toDos[day.innerText]=[];
}
const backButton=document.getElementById('back-button')
const todayButton=document.getElementById('today-button')
const frontButton=document.getElementById('front-button')
function setYearMonth(current_year,current_month){
    if (current_month==0){
        beforeYear=current_year-1;
        beforeMonth=11;
    }else{
        beforeYear=current_year;
        beforeMonth=current_month-1;
    }
    if (current_month==11){
        frontYear=current_year+1;
        frontMonth=0;
    }else{
        frontYear=current_year;
        frontMonth=current_month+1;
    }
}

function handleClickDay(event){
    day.innerText=`${current_year}년 ${current_month+1}월 ${event.target.innerText}`;
    if (day.innerText in toDos){}else{
        toDos[day.innerText]=[];
    }
    saveToDos(); 
    allClearToDo();
    const savedToDos = localStorage.getItem(TODOS_KEY);
    if (savedToDos !== null) {
        const parsedToDos = JSON.parse(savedToDos);
        toDos = parsedToDos;
        parsedToDos[day.innerText].forEach(paintToDo);
    }
}

function calendar_make(current_year,current_month){
    setYearMonth(current_year,current_month);
    let month_first=new Date(current_year,current_month,1);
    let month_last=new Date(current_year,current_month+1,0);
    let month_first_week=month_first.getDay();
    let month_last_day=month_last.getDate();
    let lastMonth=(new Date(current_year,current_month,0)).getDate();
    const last_week=document.getElementById('fifth-week');
    const first_week=document.getElementById("first-week")
    const day_area = document.getElementById('table');
    const month_now=document.getElementById('month')
    let count=0;
    month_now.innerText=current_year+'년 '+(current_month+1)+'월';
    for (i of day_area.childNodes[3].children){
        if (i ==first_week){
            for (let v=month_first_week;v<7;v++){
                if (current_year==today_year && today_month == current_month &&count+1==today.getDate()){
                    i.children[v].style.color='red';
                }else{
                    i.children[v].style.color='white'
                }
                i.children[v].innerText=(1+count)+'일'
                i.children[v].addEventListener('click',handleClickDay);
                count+=1;
            }
            let frontCount=0
            for (let l=month_first_week-1;l>=0;l--){
                i.children[l].style.color='gray';
                i.children[l].innerText=(lastMonth-frontCount)+'일';
                frontCount+=1;
            }
        }else if(i==last_week){
            
            for (let k=0;k<=month_last.getDay();k++){
            if (count==month_last_day){
                break
            }
            if (current_year==today_year && today_month == current_month && count+1==today.getDate()){
                i.children[k].style.color='red';
            }else{
                i.children[k].style.color='white';
            } 
            i.children[k].innerText=(1+count)+'일';
            i.children[k].addEventListener('click',handleClickDay);
            count+=1;
            }
            let newCount=1;
            for (let a=0;a<7;a++){
                if (i.children[a].innerText==''){
                i.children[a].style.color='gray';
                i.children[a].innerText=newCount+'일';
                newCount+=1;
                }
            }
           
            
        }else{
            for (j of i.children){
                if (count==month_last_day){
                    break
                }
                if (current_year==today_year && today_month == current_month && count+1==today.getDate()){
                    j.style.color='red';
                }else{
                    j.style.color='white';
                } 
                j.innerText=(1+count)+'일';
                j.addEventListener('click',handleClickDay);
                count+=1;
                }
        }
        let newCount=1;
        if (count==month_last_day){
            for (let a=0;a<7;a++){
                if (last_week.children[a].innerText==''){
                last_week.children[a].style.color='gray';
                last_week.children[a].innerText=newCount+'일';
                newCount+=1;
                }
            }
            break
        }
        
    }
}
function allClear(){
    const day_area = document.getElementById('table');
    for (i of day_area.childNodes[3].children){
        for (j of i.children){
            j.innerText='';
        }
    }
}
function handleBackButton(event){
    allClear();
    if (current_month===0){
        current_year--;
        current_month=11;
        calendar_make(current_year,current_month);
    }else{
        current_month--;
        calendar_make(current_year,current_month);
    }
}
function handleTodayButton(){
    allClear();
    current_year=today_year;
    current_month=today_month;
    calendar_make(current_year,current_month);
    day.innerText=`${today_year}년 ${today_month+1}월 ${today.getDate()}일`;
    const savedToDos = localStorage.getItem(TODOS_KEY);
    allClearToDo();
    if (savedToDos !== null) {
        const parsedToDos = JSON.parse(savedToDos);
        toDos = parsedToDos;
        parsedToDos[day.innerText].forEach(paintToDo);
    }
}
function handleFrontButton(){
    allClear();
    if (current_month===11){
        current_year++;
        current_month=0;
        calendar_make(current_year,current_month);
    }else{
        current_month++;
        calendar_make(current_year,current_month);
    }
}

calendar_make(current_year,current_month);
backButton.addEventListener('click',handleBackButton);
todayButton.addEventListener('click',handleTodayButton);
frontButton.addEventListener('click',handleFrontButton);


const toDoForm = document.getElementById('todo-form');
const toDoList = document.getElementById('todo-list');
const toDoInput = toDoForm.querySelector('input');
const TODOS_KEY = 'todos';


function saveToDos(){
    localStorage.setItem(TODOS_KEY,JSON.stringify(toDos));
}
function handleToDoSubmit (event){
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value='';
    const newTodoObj= {
        text:newTodo,
        id: Date.now()
    }
    if (day.innerText in toDos){
        toDos[day.innerText].push(newTodoObj);
    }else{
        toDos[day.innerText]=[newTodoObj]
    }
    paintToDo(newTodoObj)
    saveToDos()    
}
function deleteToDo(event){
    const li =event.target.parentElement;
    toDos[day.innerText]=toDos[day.innerText].filter((toDo) => toDo.id !== parseInt(li.id)); 
    saveToDos();
    li.remove();
}   
function paintToDo(newTodoObj){
    const li=document.createElement("li"); 
    li.id = newTodoObj.id;
    const span = document.createElement('span');
    span.innerText = newTodoObj.text;
    const button = document.createElement('button');
    button.innerText = '❌';
    button.style.backgroundColor='transparent';
    button.style.outline='0';
    button.style.border='0';
    button.addEventListener('click',deleteToDo);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}
function allClearToDo(){
    const todoNow=document.getElementById('todo-list');
    while (todoNow.hasChildNodes()){
        todoNow.removeChild(todoNow.firstChild);
    }
}

toDoForm.addEventListener("submit",handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos[day.innerText].forEach(paintToDo);
}
