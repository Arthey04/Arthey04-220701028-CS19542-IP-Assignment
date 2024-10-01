<?php

/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Scripting/EmptyPHP.php to edit this template
 */

  
include("connection.php");
session_start();
include("header.php");

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

function displayFeaturedEvents($conn) {
    $sql = "SELECT * FROM events WHERE featured = 1"; // Assuming you have a 'featured' column
    $result = mysqli_query($conn, $sql);
    
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            echo "<div class='featured-event'>";
            echo "<h3>" . htmlspecialchars($row["title"]) . "</h3>";
            echo "<p>" . htmlspecialchars($row["description"]) . "</p>";
            echo "<p><strong>Date:</strong> " . htmlspecialchars($row["date"]) . "</p>";
            echo "<p><strong>Time:</strong> " . htmlspecialchars($row["time"]) . "</p>";
            echo "<p><strong>Location:</strong> " . htmlspecialchars($row["location"]) . "</p>";
            echo "<p><strong>Price:</strong> ₹" . htmlspecialchars($row["price"]) . "</p>";
            echo "<p><strong>Type:</strong> " . htmlspecialchars($row["type"]) . "</p>";
            echo "<a href='event-details.php?id=" . htmlspecialchars($row["id"]) . "' class='btn'>View Details</a>";
            echo "</div>";
        }
    } else {
        echo "<p>No featured events available at the moment.</p>";
    }
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Featured Events - Event Booking System</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <section id="featured-events">
        <h2>Featured Events</h2>
        <?php displayFeaturedEvents($conn); ?>
    </section>

    
</body>
</html>
