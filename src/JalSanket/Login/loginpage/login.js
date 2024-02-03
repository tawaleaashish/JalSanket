const adminBtn = document.getElementById('adminBtn');
const userBtn = document.getElementById('userBtn');
const UserloginForm = document.getElementById('UserloginForm');
const AdminloginForm = document.getElementById('AdminloginForm');

userBtn.addEventListener('click', () => {
    UserloginForm.style.display='block';
    AdminloginForm.style.display='none';
});

adminBtn.addEventListener('click', () => {
    UserloginForm.style.display='none';
    AdminloginForm.style.display='block';
});