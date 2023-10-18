<?php

include 'config/config.php';

$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
if (!$conn)
{
    mysqli_error($conn);
}