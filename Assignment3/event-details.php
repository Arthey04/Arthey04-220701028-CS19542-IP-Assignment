<?php

/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Scripting/EmptyPHP.php to edit this template
 */
include("header.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Details - Event Booking System</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>


    <?php
        include("connection.php");
       $id = filter_input(INPUT_GET, 'id');
       
       if($id!==null)
       {
           $sql="Select * from events where id=$id";
           $result=$conn->query($sql);
           if($result->num_rows>0)
           {
                $row = $result->fetch_assoc();
                echo "TITLE: " . $row["title"]. "<br>". " DESCRIPTION: " . $row["description"]. "<br>" ."DATE:"  . $row["date"]. "<br>"." TIME: " . $row["time"]. "<br>". "LOCATION: " . $row["location"]. "<br>"." PRICE: " . $row["price"]. "<br>";
                
           if (isset($_SESSION['is_admin']) && $_SESSION['is_admin'] == 0) {
            echo "<form action='ticket-booking.php' method='POST'>";
            echo "<input type='hidden' name='event_id' value='" . htmlspecialchars($id) . "'>";
            echo "<button type='submit' class='book-ticket-btn'>Book Ticket</button>";
            echo "</form>";
           }
           }
           else{
               echo "0 results";
           }
       }
    ?>
  

</body>
</html>
