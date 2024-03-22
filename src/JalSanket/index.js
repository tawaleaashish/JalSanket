const adminBtn = document.getElementById('adminBtn');
const userBtn = document.getElementById('userBtn');
const loginBtn = document.getElementById('loginBtn');
const UserloginForm = document.getElementById('UserloginForm');
const AdminloginForm = document.getElementById('AdminloginForm');
let i = 0;

userBtn.addEventListener('click', () => {
    UserloginForm.style.display = 'block';
    AdminloginForm.style.display = 'none';
    i = 0;
});

adminBtn.addEventListener('click', () => {
    UserloginForm.style.display = 'none';
    AdminloginForm.style.display = 'block';
    i = 1;
});
import supabase from "./supabaseClient.js";
async function loginUser() {
    if (i == 0) {
        let userloginId = document.getElementById("ulid").value;
        let password = document.getElementById("passw").value;
        let { data , error } = await supabase
            .from('UserInfo')
            .select("*")
            .eq('userloginId',userloginId)
            .eq('password',password);            
        if (error) {
            console.error("Error fetching data from Supabase:", error.message);
            return;
        }
        if (data && data.length > 0) {
            localStorage.setItem('user', JSON.stringify(data[0]));
            window.location.href = "./UserPage/userpage.html"

        } else {
            alert("Invalid user credentials");
        }
    }
    if (i == 1) {
        let ADLoginName = document.getElementById("aulid").value;
        let ADpassword = document.getElementById("apassw").value;
        const { data, error } = await supabase
            .from('AdministratorInfo')
            .select("*")
            .eq('ADLoginName',ADLoginName)
            .eq('ADpassword',ADpassword);    
        if (error) {
            console.error("Error fetching data from Supabase:", error.message);
            return;
        }
        if (data && data.length > 0) {
            window.location.href = "./adminPage/adminpage.html"
        } else {
            alert("Invalid user credentials");
        }
    }
}

loginBtn.addEventListener('click', loginUser);

document.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        await loginUser();
    }
});