<?php 


/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Scripting/EmptyPHP.php to edit this template
 */


declare(strict_types=1);
include("connection.php");
session_start(); 

if (!isset($_SESSION['user_id'])) {
    echo "You must be logged in to book tickets.";
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $event_id = filter_input(INPUT_POST, 'event_id', FILTER_VALIDATE_INT);
    $user_id = $_SESSION['user_id']; 

    if ($event_id !== null) {
       
        $sql = "INSERT INTO bookings (user_id, event_id) VALUES ('$user_id', '$event_id')";
        
        if ($conn->query($sql) === TRUE) {
            echo "<script>alert('Booking successful!');</script>";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    } else {
        echo "Invalid event ID.";
    }
}
?>
