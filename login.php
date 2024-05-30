<?php
session_start();

require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

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
            // Generate a random 6-digit code for 2FA
            $two_factor_code = rand(100000, 999999);

            // Store the code in the session
            $_SESSION['2fa_code'] = $two_factor_code;
            $_SESSION['2fa_user_id'] = $id;
            $_SESSION['2fa_username'] = $username;
            $_SESSION['2fa_email'] = $email;

            // Send the 2FA code via email using PHPMailer
            $mail = new PHPMailer(true);

            try {
                // Server settings
                $mail->isSMTP();
                $mail->Host = 'smtp.example.com'; // Set the SMTP server to send through
                $mail->SMTPAuth = true;
                $mail->Username = 'your_email@example.com'; // SMTP username
                $mail->Password = 'your_email_password'; // SMTP password
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port = 587;

                // Recipients
                $mail->setFrom('your_email@example.com', 'Your Name');
                $mail->addAddress($email, $username);

                // Content
                $mail->isHTML(true);
                $mail->Subject = 'Your Two-Factor Authentication Code';
                $mail->Body    = "Your two-factor authentication code is: <b>$two_factor_code</b>";

                $mail->send();
                echo 'Two-factor authentication code has been sent to your email.';

                // Redirect to the 2FA verification page
                header("Location: verify_2fa.php");
                exit();

            } catch (Exception $e) {
                echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            }
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
