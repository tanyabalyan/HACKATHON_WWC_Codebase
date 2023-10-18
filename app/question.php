<?php

session_start();
include 'config/connection.php';

// if (isset($_SESSION)) {
//     print "session exists";
//     session_destroy();
// }

if (!isset($_SESSION['questionNum']))
{
    $sql = "SELECT * FROM questions WHERE is_enabled = 1 ORDER BY id LIMIT 1";
    $result = mysqli_query($conn, $sql);
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
    {
        $question = [
            'qid' => $row['id'],
            'question' => $row['question'],
            'questionNum' => 1,
            'incorrectResponse' => $row['incorrect_response']
        ];
    }
    $_SESSION['questionNum'] = 1;
    $_SESSION['questionId'] = $question['qid'];
}
else
{
    $questionNum = $_SESSION['questionNum'] + 1;
    $sql = "SELECT * FROM questions WHERE is_enabled = 1 AND id > " . $_SESSION['questionId'] . " ORDER BY id LIMIT 1";
    $result = mysqli_query($conn, $sql);
    while ($row = mysqli_fetch_array($result))
    {
        $question = [
            'qid' => $row['id'],
            'question' => $row['question'],
            'questionNum' => $questionNum,
            'incorrectResponse' => $row['incorrect_response']
        ];
    }
    $_SESSION['questionNum'] = $questionNum;
    $_SESSION['questionId'] = $question['qid'];
}


mysqli_free_result($result);

$sql = "SELECT answer FROM answers WHERE is_correct = 1 AND question_id = " . $question['qid'];
$result = mysqli_query($conn, $sql);
$correctAnswer = '';
while($row = mysqli_fetch_row($result))
{
    $correctAnswer = $row[0];
}
$question['incorrectResponse'] = str_replace('[CORRECT_ANSWER]', $correctAnswer, $question['incorrectResponse']);

mysqli_free_result($result);

$sql = "SELECT * FROM answers WHERE question_id = " . $question['qid'] . " AND is_enabled = 1 ORDER BY id";
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


