<?php

/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Scripting/EmptyPHP.php to edit this template
 */

    include("connection.php");
    
?>
<?PHP
if($_SERVER["REQUEST_METHOD"]=="POST"){
     $username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
    $password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);
    $stmt=$conn->prepare("INSERT INTO users(username,password,email) values (?,?,?)");
    $stmt->bind_param("sss", $username, $hashed_password, $email);
     $stmt->execute();
     $stmt->close();
    $conn->close();
}
  ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h2>Registration</h2>
    <form method="POST" action="index.php">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        <br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <br>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <br>
        <input type="submit" value="Register">
    </form>
    <p><a href="login.php">Already have an account? Login here.</a></p>
</body>
</html>