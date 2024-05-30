<?php
session_start();

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $entered_code = $_POST['2fa_code'];

    // Verify the 2FA code
    if ($entered_code == $_SESSION['2fa_code']) {
        // 2FA code is correct, log the user in
        $_SESSION['user_id'] = $_SESSION['2fa_user_id'];
        $_SESSION['username'] = $_SESSION['2fa_username'];

        // Clear the 2FA session variables
        unset($_SESSION['2fa_code']);
        unset($_SESSION['2fa_user_id']);
        unset($_SESSION['2fa_username']);
        unset($_SESSION['2fa_email']);

        // Redirect to the main page or dashboard
        header("Location: index.html");
        exit();
    } else {
        echo "Invalid two-factor authentication code.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Two-Factor Authentication</title>
</head>
<body>
<form action="verify_2fa.php" method="post">
    <label for="2fa_code">Enter the 2FA code sent to your email:</label>
    <input type="text" id="2fa_code" name="2fa_code" required>
    <button type="submit">Verify</button>
</form>
</body>
</html>
