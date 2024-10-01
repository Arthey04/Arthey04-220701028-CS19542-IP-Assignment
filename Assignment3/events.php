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

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Events - Event Booking System</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <!-- Navigation Bar -->
<!--    <nav>
        <ul>
            <li><a href="index.php">Home</a></li>
            <li><a href="events.php">Events</a></li>
            <li><a href="login.php">Login/Register</a></li>
            <li><a href="admin-dashboard.php" id="adminLink">Admin Dashboard</a></li>
        </ul>
    </nav>-->

    <!-- Event Listing -->
    <section id="event-listing">
        <h2>Available Events</h2>

        <form method="post" action="events.php">
    <div class="filters">
        <div>
        <label for="date">Filter by Date</label> 
        <select name="date" id="date">
            <option value="">Select Date</option>
            <option value="today">Today</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
            <option value="this-year">This Year</option>
       
        </select>
        </div>
        <div>
        <label for="location">Filter by Location</label> 
        <select name="location" id="location">
            <option value="">Select Location</option>
            <option value="chennai">Chennai</option>
            <option value="madurai">Madurai</option>
            <option value="trichy">Trichy</option>
            <option value="salem">Salem</option>
            <option value="kanchipuram">Kanchipuram</option>
        </select>
        </div>
        <div>
        
        <label for="type">Filter by Type</label> 
        <select name="type" id="type">
            <option value="">Select Type</option>
            <option value="concert">Concert</option>
            <option value="conference">Conference</option>
            <option value="exhibition">Exhibition</option>
            <option value="festival">Festival</option>
            <option value="charity">Charity</option>
        </select>
        </div>
        <button type="submit">Filter</button>
    </div>
</form>


   
    </section>

</body>
</html>
<?php
    
    function displayFilteredRecords($conn)
    {
        
        $sql="Select * from events where 1=1";
        if(!empty($_POST['date']))
        {
            $dateFilter=$_POST['date'];
            switch($dateFilter)
            {
                case 'today':
                     $sql .= " AND date = CURDATE()";
                    break;
                 case 'this-week':
                        $sql .= " AND WEEK(date) = WEEK(CURDATE())";
                        break;
                 case 'this-month':
                        $sql .= " AND MONTH(date) = MONTH(CURDATE())";
                        break;
                case 'this-year':
                        $sql .= " AND YEAR(date) = YEAR(CURDATE())";
                        break;
            }
        }
        if(!empty($_POST['location']))
        {
            $location = mysqli_real_escape_string($conn, $_POST['location']);
            $sql .= " AND location = '$location'";
        }
        
        if (!empty($_POST['type'])) {
                $type = mysqli_real_escape_string($conn, $_POST['type']);
                $sql .= " AND type = '$type'";
            }
            
        $result = mysqli_query($conn, $sql);
        if(mysqli_num_rows($result)>0)
        {
            while($row=mysqli_fetch_assoc($result))
            {
                echo "<a href='event-details.php?id=" . htmlspecialchars($row["id"]) . "'>";
                    echo "<div class='event'>";
                    echo "TITLE: " . htmlspecialchars($row["title"]) . "<br>";
                    echo "DATE: " . htmlspecialchars($row["date"]) . "<br>";
                    echo "TYPE: " . htmlspecialchars($row["type"]) . "<br>";
                    echo "LOCATION: " . htmlspecialchars($row["location"]) . "<br>";
                    echo "</div>";
                    echo "</a>";
            }
        }
        else{
            echo "No events found based on the selected filters.";
        }
    }
    
   displayFilteredRecords($conn);
   
    
    ?>
