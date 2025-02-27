<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $to = "midoallam2003@gmail.com";
    $subject = "رسالة من الموقع";
    $body = "الاسم: $name\nالبريد: $email\nالرسالة: $message";
    mail($to, $subject, $body);
    echo json_encode(["status" => "success"]);
}
?>