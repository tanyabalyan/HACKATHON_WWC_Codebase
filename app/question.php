<?php

session_start();
include 'config/connection.php';

$category = $_GET['cat'];
$questionNo = $_GET['no'];
$questions = [];

$sql = "SELECT name FROM categories WHERE id = " . $category . "";
$result = mysqli_query($conn, $sql);
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
{
    $categoryName = $row['name'];
}

$sql = "SELECT * FROM questions WHERE category_id = " . $category . " ORDER BY number";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0)
{
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
    {
        $question = [
            'category' => $categoryName,
            'question' => $row['question'],
            'wrong' => $row['incorrect_response']
        ];

        $sql = "SELECT * FROM answers WHERE question_id = " . $row['id'] . " ORDER BY id";
        $result2 = mysqli_query($conn, $sql);
        $i = 0;
        $options = [];
        while ($row2 = mysqli_fetch_array($result2))
        {
            $options[] = $row2['answer'];
            if ($row2['is_correct'] === "1")
            {
                $isCorrect = $i;
            }
            // $options[$i] = [
            //     'aid' => $row['id'],
            //     'answer' => $row['answer'],
            //     'is_correct' => $row['is_correct']
            // ];
            $i++;
        }
        $question['choices'] = $options;
        $question['correct'] = $isCorrect;
        // print_r($question);

        // $questions[] = $question;
        array_push($questions, $question);
    }

    // $_SESSION['questionId'] = $question['qid'];

    // mysqli_free_result($result);

    

    
    // mysqli_free_result($result);

    // $answers = [
    //     'choices' => $options,
    //     'correct' => $isCorrect,
    // ];

    // $data = array_merge($question, $answers);
    echo json_encode($questions);
}
// else 
// {
//     echo '';
// }




