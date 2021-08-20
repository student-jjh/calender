//getFullYear() Date 객체의 연도를 가져옴
//getMonth() Date 객체의 월 정보를 가져옵니다. 1월은 0으로 표현됨을 주의해야 합니다. (0~11)
//getDate() - Date 객체의 일자 정보를 가져옵니다. (0~31)
//getDay() - Date 객체의 요일 정보를 가져옵니다.(0~6) (일요일이 0, 월요일이1, 토요일이 6으로 표현됩니다.)
//i of day_area.childNodes[3].children
let today = new Date();
let year=today.getFullYear();
let month=today.getMonth();
let month_first=new Date(year,month,1);
let month_last=new Date(year,month+1,0);
let month_first_week=month_first.getDay();
let month_last_day=month_last.getDate();
console.log(month_last_day);
const first_week=document.getElementById("first-week")
const day_area = document.getElementById('table');
const month_now=document.getElementById('month')
//첫 주와 나머지주 구분 
    //첫주
let count=0;
month_now.innerText=(month+1)+'월';
for (i of day_area.childNodes[3].children){
    if (i ==first_week){
        for (let v=month_first_week;v<7;v++){
            i.children[v].innerText=(1+count)+'일'
            count+=1;
        }
    }else{
        for (j of i.children){
            if (count==month_last_day){
                break
            }
            j.innerText=(1+count)+'일';
            count+=1;
            }
    }
    if (count==month_last_day){
        break
    }

}

