const adminBtn = document.getElementById('adminBtn');
const userBtn = document.getElementById('userBtn');
const loginBtn = document.getElementById('loginBtn');
const UserloginForm = document.getElementById('UserloginForm');
const AdminloginForm = document.getElementById('AdminloginForm');
let i=0;

userBtn.addEventListener('click', () => {
    UserloginForm.style.display='block';
    AdminloginForm.style.display='none';
    i=0;
});

adminBtn.addEventListener('click', () => {
    UserloginForm.style.display='none';
    AdminloginForm.style.display='block';
    i=1;
});
import supabase from "./supabaseClient.js";
loginBtn.addEventListener('click', async()=>{
    if(i==0)
    {
        let userloginId=document.getElementById("userloginId").value;
        let password=document.getElementById("password").value;
        const { data, error } = await supabase
            .from('UserInfo')
            .select('*')
            .eq('userloginId', userloginId)
            .eq('password', password);

        if (error) {
            console.error("Error fetching data from Supabase:", error.message);
            return;
        }
        if (data && data.length > 0) {
            localStorage.setItem('user', JSON.stringify(data[0]));
            window.location.href="./UserPage/userpage.html"

        } else {
            alert("Invalid user credentials");
        }
    }
    if(i==1)
    {
        let ADLoginName=document.getElementById("ADLoginName").value;
        let ADpassword=document.getElementById("ADpassword").value;
        const { data, error } = await supabase
        .from('AdministratorInfo')
        .select('*')
        .eq('ADLoginName', ADLoginName)
        .eq('ADpassword', ADpassword);
        console.log(data)
        if (error) {
            console.error("Error fetching data from Supabase:", error.message);
            return;
        }
        if (data && data.length > 0) {
            window.location.href="./adminPage/adminpage.html"
        } else {
            alert("Invalid user credentials");
        }
    }
});