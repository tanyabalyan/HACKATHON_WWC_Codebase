<?php

include 'config/connection.php';

$category_id = $_POST['cat'];
$score = $_POST['score'];
// $qNumber = $_POST['qNo'];

$sql = "SELECT COUNT(*) AS counter FROM scores WHERE user_id = 1 AND category_id = " . $category_id;
$result = mysqli_query($conn, $sql);
while($row = mysqli_fetch_array($result))
{
    $counter = $row['counter'];
}

if ($counter > 0)
{
    $sql = "DELETE FROM scores WHERE user_id = 1 AND category_id = " . $category_id;
    mysqli_query($conn, $sql);
}

$sql = "INSERT INTO scores(user_id, category_id, score) VALUES(1, " . $category_id . ", " . $score . ")";
$result = mysqli_query($conn, $sql);


$sql = "SELECT score FROM scores WHERE user_id = 1 AND category_id = " . $category_id;
$result = mysqli_query($conn, $sql);
while($row = mysqli_fetch_array($result))
{
    $score = $row['score'];
}

echo $score;