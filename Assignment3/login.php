<?php

/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Scripting/EmptyPHP.php to edit this template
 */
  include("connection.php");
?>
<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    
    $username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
    $password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);
    
    $stmt=$conn->prepare("SELECT id, username, password, is_admin FROM users WHERE username = ?");
     if ($stmt === false) {
        die('Prepare failed: ' . htmlspecialchars($conn->error));
    }
      $stmt->bind_param("s", $username);
      $stmt->execute();
      $stmt->bind_result($id, $db_username, $db_password, $is_admin);
       if ($stmt->fetch()) {
           if (password_verify($password, $db_password)) {
               
                $_SESSION['user_id'] = $id;
                $_SESSION['username'] = $db_username;
                $_SESSION['is_admin'] = $is_admin;
                
                 if ($is_admin) {
                header("Location: AdminDashboard.php");
                exit();
            } else {
                header("Location: home.php");
                exit();
            }
              $stmt->close();
              $conn->close();
           }
       }
           else {
            echo "Password is incorrect.";
        }
} 

   
    $conn->close();



         
    
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h2>Login</h2>
    <form method="POST" action="">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        <br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <br>
        <input type="submit" value="Login">
    </form>
    <p><a href="index.php">Don't have an account? Register here.</a></p>
</body>
</html>