<?php
require_once "db.php";

$user_id = $_GET['user_id'];

$sql = "SELECT id, task_text, created_at FROM tasks WHERE user_id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$user_id]);

$tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($tasks);
