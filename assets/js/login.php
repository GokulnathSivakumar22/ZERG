<?php
session_start();

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
    $usernameOrEmail = $_POST['username'];
    $password = $_POST['password'];

    // Prepare and bind
    $stmt = $conn->prepare("SELECT id, username, email, password FROM users WHERE username = ? OR email = ?");
    $stmt->bind_param("ss", $usernameOrEmail, $usernameOrEmail);

    // Execute statement
    $stmt->execute();
    $stmt->store_result();

    // Check if user exists
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $username, $email, $hashed_password);
        $stmt->fetch();

        // Verify password
        if (password_verify($password, $hashed_password)) {
            // Start the session
            $_SESSION['user_id'] = $id;
            $_SESSION['username'] = $username;
            echo "Login successful. Welcome, " . $username;
            // Redirect to a logged-in page
            header("Location: index.html");
        } else {
            echo "Invalid password.";
        }
    } else {
        echo "No user found with that username or email.";
    }

    // Close the statement
    $stmt->close();
}

// Close the connection
$conn->close();
?>
