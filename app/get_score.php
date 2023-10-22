<?php

include 'config/connection.php';

$category_id = $_GET['cat'];

$sql = "SELECT score FROM scores WHERE user_id = 1 AND category_id = " . $category_id;
$result = mysqli_query($conn, $sql);
while($row = mysqli_fetch_array($result))
{
    $score = $row['score'];
}

echo $score;