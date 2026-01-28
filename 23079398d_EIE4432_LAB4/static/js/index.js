document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/auth/me');

        if (!response.ok) {
            alert("Please login");
            window.open('/login.html', '_self'); 
            return;
        }

        const result = await response.json();
        const greetingElement = document.getElementById('greeting');
        greetingElement.innerHTML = `Welcome back! ${result.user.username} (${result.user.role})`;

        const logoutButton = document.getElementById('logoutButton');
        logoutButton.addEventListener('click', async () => {
            if (confirm("Confirm to logout?")) {
                try {
                    const logoutResponse = await fetch('/auth/logout', {
                        method: 'POST',
                    });

                    if (logoutResponse.ok) {
                        alert("Logged out successfully.");
                        window.open('/login.html', '_self');
                    } else {
                        alert("Failed to logout.");
                    }
                } catch (error) {
                    alert("An error occurred while logging out.");
                }
            }
        });

    } catch (error) {
        alert("An error occurred while checking login status.");
        window.open('/login.html', '_self');
    }
});