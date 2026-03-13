/* Faculty Accounts */

let faculty = JSON.parse(localStorage.getItem("faculty")) || [];

function register(){

let user=document.getElementById("newUser").value;
let pass=document.getElementById("newPass").value;

faculty.push({user:user,pass:pass});

localStorage.setItem("faculty",JSON.stringify(faculty));

document.getElementById("signupMsg").innerText="Registration Successful";

}

function login(){

let user=document.getElementById("loginUser").value;
let pass=document.getElementById("loginPass").value;

let found = faculty.find(f => f.user===user && f.pass===pass);

if(found){

window.location="dashboard.html";

}
else{

document.getElementById("loginMsg").innerText="Invalid Login";

}

}

/* Students */

let students = JSON.parse(localStorage.getItem("students")) || [];

let selectedDate = new Date().toISOString().split("T")[0];

window.onload=function(){

let dateInput=document.getElementById("attendanceDate");

if(dateInput){

dateInput.value=selectedDate;

}

renderDashboard();
renderEdit();

}

/* Add Student */

function addStudent(){

let name=document.getElementById("studentName").value;

let student={

name:name,
records:{}

};

students.push(student);

save();

renderEdit();

}

/* Delete Student */

function deleteStudent(i){

students.splice(i,1);

save();

renderEdit();

}

/* Save */

function save(){

localStorage.setItem("students",JSON.stringify(students));

}

/* Change Date */

function changeDate(){

selectedDate=document.getElementById("attendanceDate").value;

renderDashboard();

}

/* Mark Present */

function markPresent(i){

students[i].records[selectedDate]="present";

save();

renderDashboard();

}

/* Mark Absent */

function markAbsent(i){

students[i].records[selectedDate]="absent";

save();

renderDashboard();

}

/* Attendance Percentage */

function getPercentage(student){

let days=Object.keys(student.records).length;

let present=Object.values(student.records).filter(v=>v==="present").length;

if(days===0) return 0;

return ((present/days)*100).toFixed(1);

}

/* Dashboard Table */

function renderDashboard(){

let table=document.getElementById("studentTable");

if(!table) return;

table.innerHTML=`

<tr>
<th>Student</th>
<th>Present</th>
<th>Absent</th>
<th>Attendance %</th>
</tr>

`;

students.forEach((s,i)=>{

table.innerHTML+=`

<tr>

<td>${s.name}</td>

<td>
<button class="present"
onclick="markPresent(${i})">
Present
</button>
</td>

<td>
<button class="absent"
onclick="markAbsent(${i})">
Absent
</button>
</td>

<td>${getPercentage(s)}%</td>

</tr>

`;

});

}

/* Edit Student Table */

function renderEdit(){

let table=document.getElementById("editTable");

if(!table) return;

table.innerHTML=`

<tr>
<th>Name</th>
<th>Delete</th>
</tr>

`;

students.forEach((s,i)=>{

table.innerHTML+=`

<tr>

<td>${s.name}</td>

<td>
<button onclick="deleteStudent(${i})">
Delete
</button>
</td>

</tr>

`;

});

}