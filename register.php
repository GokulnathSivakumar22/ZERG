<?php
// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database credentials
$servername = "localhost";
$username = "root";
$password = "Database@123"; // Replace with your MySQL root password
$dbname = "receipe_platform";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Capture the form data
    $name = $_POST['name'];
    $surname = $_POST['surname'];
    $username = $_POST['username'];
    $dob = $_POST['dob'];
    $sex = $_POST['sex'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT); // Hash the password
    $terms = isset($_POST['terms']) ? 1 : 0;

    // Debug output
    echo "Name: $name<br>";
    echo "Surname: $surname<br>";
    echo "Username: $username<br>";
    echo "Date of Birth: $dob<br>";
    echo "Sex: $sex<br>";
    echo "Email: $email<br>";
    echo "Password: (hidden for security)<br>";
    echo "Terms: $terms<br>";

    // Prepare and bind the SQL statement
    $stmt = $conn->prepare("INSERT INTO users (name, surname, username, dob, sex, email, password, terms) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssssi", $name, $surname, $username, $dob, $sex, $email, $password, $terms);

    // Execute the statement
    if ($stmt->execute()) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the statement
    $stmt->close();
}

// Close the connection
$conn->close();
?>
