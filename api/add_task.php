<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

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
