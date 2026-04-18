document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent page refresh

        // 1. Collect data from input fields using their IDs
        let formData = {
            nom: document.getElementById('nom').value,
            prenom: document.getElementById('prenom').value,
            email: document.getElementById('email').value,
            date_naissance: document.getElementById('date_naissance').value,
            sexe: document.getElementById('sexe').value,
            etablissement: document.getElementById('etablissement').value,
            filiere: document.getElementById('filiere').value,
            role: document.getElementById('role').value,
            password: document.getElementById('password').value
        };

        // 2. Send data to Laravel API endpoint
        fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            // 3. Check if registration was successful
            if (data.message === 'Inscription réussie avec succès!') {
                alert('Registration successful! 🎉');
                console.log(data.user);
                // You can add code here to hide the register form and show login form
            } else {
                alert('There is an issue with the provided data.');
                console.log(data); // Check errors in console
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Server connection error (make sure Laravel is running).');
        });
    });
    const loginForm = document.getElementById("loginForm");

loginForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent page refresh

    // 1. Collect email and password
    let loginData = {
        email: document.getElementById('login-email').value,
        password: document.getElementById('login-password').value
    };

    // 2. Send data to Laravel API
    fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
        // 3. Check server response
        if (data.message === 'Connexion réussie !') {
    alert('Welcome! Login successful. 🎓');
    console.log(data.user);
    
    // Redirect user based on their role (student or teacher)
    if (data.user.role === 'etudiant') {
        // Go back one folder and redirect to student space
        window.location.href = "../espace-etu/index.html"; 
    } else if (data.user.role === 'enseignant') {
        // Go back one folder and redirect to teacher space
        window.location.href = "../espace-prof/index.html";
    }
    
} else {
    alert('Invalid email or password. Please try again.');
}
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Server connection error.');
    });
});

});