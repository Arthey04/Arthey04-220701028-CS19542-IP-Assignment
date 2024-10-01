<?php

/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Scripting/EmptyPHP.php to edit this template
 */




include("connection.php");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Booking System</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <nav>
        <ul>
            <li><a href="home.php">Home</a></li>
            <li><a href="events.php">Events</a></li>
            <li><a href="login.php">Login/Register</a></li>
            
            <?php
            if (isset($_SESSION['is_admin']) && $_SESSION['is_admin']) {
                echo '<li><a href="AdminDashboard.php" id="adminLink">Admin Dashboard</a></li>';
            }
           
            
            echo '<li><a href="logout.php">Logout</a></li>';
        
            ?>
        </ul>
    </nav>


</body>
</html>
