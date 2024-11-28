<?php
require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'];
$password = $data['password'];

$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$email]);
$user = $stmt->fetch();

if ($user && password_verify($password, $user['password'])) {
    echo json_encode(["success" => true, "message" => "Успішний вхід", "user_id" => $user['id']]);
} else {
    echo json_encode(["success" => false, "message" => "Невірний email або пароль"]);
}
