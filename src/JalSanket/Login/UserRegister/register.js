
let Name=document.getElementById("fullname");        
let userId=document.getElementById("userloginId");        
let Password=document.getElementById("password");        

const registerForm = document.getElementById('registerForm');

import supabase from "../../supabaseClient.js";
registerForm.addEventListener('submit', async(event) => {
    event.preventDefault();
    if(Name.value.length==0 || userId.value.length==0)
    {
        alert("Name or Username details not entered.");
    }
    else if(Password.value.length<8)
    {
        alert("Length of password must be atleast 8 characters");
    }
    else
    {
        const { data, error } = await supabase
        .from('UserInfo')
        .insert([
            { name: Name.value, userloginId: userId.value, password: Password.value },
        ])
        
        if (error) {
            console.error("Error Inserting data into Supabase:", error);
            return;
        }
        alert('Registration successful!');
        window.location.href = '../../index.html';
    }
});