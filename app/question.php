<?php

session_start();
include 'config/connection.php';

$category = $_GET['cat'];
$questionNo = $_GET['no'];

$sql = "SELECT * FROM questions WHERE category_id = " . $category . " AND number = " . $questionNo . " ORDER BY id LIMIT 1";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0)
{
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
    {
        $question = [
            'qid' => $row['id'],
            'question' => $row['question'],
            'incorrectResponse' => $row['incorrect_response']
        ];
    }

    $_SESSION['questionId'] = $question['qid'];

    mysqli_free_result($result);

    $sql = "SELECT * FROM answers WHERE question_id = " . $question['qid'] . " ORDER BY id";
    $result = mysqli_query($conn, $sql);
    $i = 0;
    $options = [];
    while ($row = mysqli_fetch_array($result))
    {
        $options[$i] = [
            'aid' => $row['id'],
            'answer' => $row['answer'],
            'is_correct' => $row['is_correct']
        ];
        $i++;
    }

    mysqli_free_result($result);

    $answers = [
        'options' => $options,
    ];

    $data = array_merge($question, $answers);
    echo json_encode($data);
}
else 
{
    echo '';
}




