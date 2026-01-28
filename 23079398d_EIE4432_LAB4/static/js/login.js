document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton'); 
    const form = document.querySelector('form');

    loginButton.addEventListener('click', async () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (!username || !password) {
            alert("Username and password cannot be empty");
            return;
        }

        const formData = new FormData(form);

        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                alert(`Logged as \`${result.user.username}\` (${result.user.role})`);
                window.location.href = '/index.html'; 
            } else {
                alert(result.message || "Unknown error");
            }
        } catch (error) {
            alert("Unknown error");
        }
    });
});