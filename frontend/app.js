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
});