<?php
require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);
$task_text = $data['task_text'];
$user_id = $data['user_id'];

$sql = "INSERT INTO tasks (user_id, task_text) VALUES (?, ?)";
$stmt = $pdo->prepare($sql);

if ($stmt->execute([$user_id, $task_text])) {
    echo json_encode(["success" => true, "message" => "Завдання додано"]);
} else {
    echo json_encode(["success" => false, "message" => "Помилка додавання"]);
}
