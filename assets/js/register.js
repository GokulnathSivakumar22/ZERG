function registerUser() {
    // Get form data
    var name = document.getElementById('name').value;
    var surname = document.getElementById('surname').value;
    var username = document.getElementById('username').value;
    var dob = document.getElementById('dob').value;
    var sex = document.getElementById('sex').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Check if user is not a robot
    if (!document.getElementById('robot').checked) {
        alert("Please confirm that you are not a robot.");
        return;
    }

    // Save user data to database
    // For simplicity, we'll just log the data for now
    console.log("User Registration Successful!");
    console.log("Name: " + name);
    console.log("Surname: " + surname);
    console.log("Username: " + username);
    console.log("Date of Birth: " + dob);
    console.log("Sex: " + sex);
    console.log("Email: " + email);
    // Store password securely

}
