class UserAuthentication {
    constructor() {
        this.data1 = JSON.parse(localStorage.getItem('data1')) || [];

        document.getElementById('submitButton').addEventListener('click', (event) => {
            event.preventDefault();
            this.signup();
        });

        document.getElementById('submitButton').addEventListener('click', (event) => {
            event.preventDefault();
            this.login();
        });
    }

    signup() {
        let signupForm = document.getElementById("signupForm");
        let signupFormData = new FormData(signupForm);

        const name = signupFormData.get("username");
        const email = signupFormData.get("email");
        const password = signupFormData.get("password");
        const confirmPassword = signupFormData.get("confirmPassword");

        const usernameExists = this.data1.some(item => item.username === name);

        if (usernameExists) {
            alert('Username already exists');
        } else if (!this.isValidEmail(email)) {
            alert('Invalid email address');
        } else {
            if (password !== confirmPassword) {
                alert('Passwords do not match');
            } else {
                const user = {
                    username: name,
                    email: email,
                    password: password,
                };
                this.data1.push(user);
                localStorage.setItem('data', JSON.stringify(this.data1));
                window.location.href = "login.html";
            }
        }
    }

    login() {
        let signinForm = document.getElementById("signinForm");
        let signinFormData = new FormData(signinForm);

        const name = signinFormData.get("username");
        const password = signinFormData.get("password");

        const usernameExists = this.data1.some(item => item.username === name);
        if (usernameExists) {
            if (password === this.data1.find(x => x.username === name).password) {
                window.location.href = 'index.html';
            } else {
                alert('Incorrect password');
            }
        } else {
            alert('User does not exist');
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    let userAuthentication = new UserAuthentication();
});
