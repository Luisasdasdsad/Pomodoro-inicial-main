document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Usuario y contraseña parciales
    const validUsername = 'admin';
    const validPassword = 'admin';
    
    if (username === validUsername && password === validPassword) {
        window.location.href = 'pomodoro.html';
    } else {
        document.getElementById('error-message').textContent = 'Usuario o contraseña incorrectos';
    }
});