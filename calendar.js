//getFullYear() Date 객체의 연도를 가져옴
//getMonth() Date 객체의 월 정보를 가져옵니다. 1월은 0으로 표현됨을 주의해야 합니다. (0~11)
//getDate() - Date 객체의 일자 정보를 가져옵니다. (0~31)
//getDay() - Date 객체의 요일 정보를 가져옵니다.(0~6) (일요일이 0, 월요일이1, 토요일이 6으로 표현됩니다.)
//i of day_area.childNodes[3].children
let today = new Date();
let today_year=today.getFullYear();
let today_month=today.getMonth();
let current_year=today.getFullYear();
let current_month=today.getMonth();
const backButton=document.getElementById('back-button')
const todayButton=document.getElementById('today-button')
const frontButton=document.getElementById('front-button')



function calendar_make(current_year,current_month){
    let month_first=new Date(current_year,current_month,1);
    let month_last=new Date(current_year,current_month+1,0);
    let month_first_week=month_first.getDay();
    let month_last_day=month_last.getDate();

    const first_week=document.getElementById("first-week")
    const day_area = document.getElementById('table');
    const month_now=document.getElementById('month')


    let count=0;
    month_now.innerText=current_year+'년 '+(current_month+1)+'월';
    for (i of day_area.childNodes[3].children){
        if (i ==first_week){
            for (let v=month_first_week;v<7;v++){
                if (count+1==today.getDate()){
                    i.children[v].style.color='red';
                }else{
                    i.children[v].style.color='white'
                }
                i.children[v].innerText=(1+count)+'일'
                count+=1;
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
                count+=1;
                }
        }
        if (count==month_last_day){
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