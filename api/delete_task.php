<?php
require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);
$task_id = $data['task_id'];

$sql = "DELETE FROM tasks WHERE id = ?";
$stmt = $pdo->prepare($sql);

if ($stmt->execute([$task_id])) {
    echo json_encode(["success" => true, "message" => "Завдання видалено"]);
} else {
    echo json_encode(["success" => false, "message" => "Помилка видалення"]);
}
