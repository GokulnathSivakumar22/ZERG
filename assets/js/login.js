function loginUser() {
    // Get form data
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Validate username and password 
    // For simplicity, we'll just log the data for now
    console.log("Login Successful!");
    console.log("Username: " + username);
    console.log("Password: " + password);

    // Generate and send 2FA code (you can use email or SMS for sending)
    var code = generate2FACode();
    console.log("Your 2FA code: " + code);
}

function generate2FACode() {
    // Generate a random 6-digit code
    var code = Math.floor(100000 + Math.random() * 900000);
    return code;
}
