document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submitButton').addEventListener('click', (event) => {
        event.preventDefault();
        console.log("I am signup");
        let data1 = JSON.parse(localStorage.getItem('data1')) || [];
    
        let signupForm = document.getElementById("signupForm");
        let signupFormData = new FormData(signupForm);
    
        const name = signupFormData.get("username");
        const email = signupFormData.get("email");
        const password = signupFormData.get("password");
        const confirmPassword = signupFormData.get("confirmPassword");

      
        const usernameExists = data1.some(item => item.username === name);
    
        if (usernameExists) {
            alert('Username already exists');
           
        } 
        else if(!isValidEmail(email)) {
            alert('Invalid email address');
        } 
        
        else {
            if (password !== confirmPassword) {
                alert('Passwords do not match');
            } else {
                const user = {
                    username: name,
                    email: email,
                    password: password,
                };
                data1.push(user);
                localStorage.setItem('data1', JSON.stringify(data1));
                window.location.href="login.html";
                
            }
        }
    
      
    });


    // log in
    
    document.getElementById('submitButton').addEventListener('click', (event) => {
        event.preventDefault();
        
        let data1 = JSON.parse(localStorage.getItem('data1')) || [];
    
        let signinForm = document.getElementById("signinForm");
        let signinFormData = new FormData(signinForm);
    
        const name = signinFormData.get("username");
        const password = signinFormData.get("password");
    
    
        const usernameExists = data1.some(item => item.username === name);
        if (usernameExists) {
            if (password === data1.find(x => x.username === name).password) {
                window.location.href='index.html';
            } else {
                alert('Incorrect password');
                console.log("Incorrect password");
            }
        } else {
            alert('User does not exist');
            console.log("User does not exist");
        }
    
    });
});

function isValidEmail(email) {
    // This is a basic regex for email validation, you might want to use a more comprehensive one
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}