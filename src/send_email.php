<?php
// Simple .env loader (no external libraries required)
function loadEnv($path) {
    if (!file_exists($path)) {
        return;
    }
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($name, $value) = explode('=', $line, 2);
        $_ENV[trim($name)] = trim($value);
    }
}

loadEnv(__DIR__ . '/.env');

// Set JSON response header
header('Content-Type: application/json');

// Recipient email — loaded from .env or fallback
$recipient_email = isset($_ENV['RECIPIENT_EMAIL']) ? $_ENV['RECIPIENT_EMAIL'] : 'devjapc@gmail.com';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 1. Receive and sanitize input
    $name    = strip_tags(trim($_POST["name"] ?? ''));
    $email   = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $service = strip_tags(trim($_POST["service"] ?? ''));
    $message = trim($_POST["message"] ?? '');

    // 2. Validate
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Please fill in all fields correctly."]);
        exit;
    }

    // 3. Build the email
    $subject = "New Inquiry from $name: $service";

    $email_content  = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Service Interest: $service\n\n";
    $email_content .= "Message:\n$message\n";

    // 4. Headers — use a server-side From to avoid spam filters
    $headers  = "From: Hot Shooters Website <noreply@hot-shooters.com>\r\n";
    $headers .= "Reply-To: $name <$email>\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // 5. Send
    if (mail($recipient_email, $subject, $email_content, $headers)) {
        echo json_encode(["status" => "success", "message" => "Message sent successfully."]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "server_error", "message" => "Failed to send message. Please try again later."]);
    }

} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed."]);
}
?>