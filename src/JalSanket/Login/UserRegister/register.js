const registerForm = document.getElementById('registerForm');

        registerForm.addEventListener('submit', (event) => {
            event.preventDefault(); 
            alert('Registration successful!');
            window.location.href = 'login1.html';
        });