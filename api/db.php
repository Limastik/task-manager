<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$host = 'localhost';        // Адреса сервера бази даних
$dbname = 'task_list';      // Ім'я бази даних
$username = 'root';         // Ім'я користувача бази даних
$password = '';             // Пароль користувача

try {
    // Створення підключення до бази даних за допомогою PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Режим помилок
} catch (PDOException $e) {
    // Якщо підключення не вдалось, вивести помилку
    die("Помилка підключення до бази даних: " . $e->getMessage());
}
