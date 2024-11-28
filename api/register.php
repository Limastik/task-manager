<?php
require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$username = $data['username'];
$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_DEFAULT);

$sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
$stmt = $pdo->prepare($sql);

if ($stmt->execute([$username, $email, $password])) {
    echo json_encode(["message" => "Користувач успішно зареєстрований"]);
} else {
    echo json_encode(["message" => "Помилка реєстрації"]);
}
