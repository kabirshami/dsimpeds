<?php
// Basic, safe-ish mail handler for shared hosting (cPanel).
// Put this file in same folder as index.html (root of website).

// Where to receive emails:
$to = "drshahidiqbalmalik@gmail.com";

// Simple honeypot anti-bot:
if (!empty($_POST['company'])) {
  header("Location: index.html?mail=fail#contact");
  exit;
}

function clean($v) {
  $v = trim($v ?? '');
  $v = strip_tags($v);
  $v = str_replace(["\r","\n"], " ", $v);
  return $v;
}

$name  = clean($_POST['name'] ?? '');
$phone = clean($_POST['phone'] ?? '');
$email = clean($_POST['email'] ?? '');
$msg   = trim($_POST['message'] ?? '');

if ($name === '' || $phone === '' || $msg === '') {
  header("Location: index.html?mail=fail#contact");
  exit;
}

$subject = "Website Contact Message - Dr Shahid Iqbal Malik";
$body =
"New message from website contact form:\n\n".
"Name: $name\n".
"Phone: $phone\n".
"Email: $email\n\n".
"Message:\n$msg\n\n".
"----\nSent from website contact form.";

$headers = [];
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/plain; charset=UTF-8";

// Use a domain email if possible, otherwise many hosts may mark as spam.
// Replace noreply@yourdomain.com with your domain email after hosting.
$fromEmail = "noreply@yourdomain.com";
$headers[] = "From: Website Contact <$fromEmail>";

if ($email !== '') {
  $headers[] = "Reply-To: $email";
}

$ok = @mail($to, $subject, $body, implode("\r\n", $headers));

if ($ok) {
  header("Location: index.html?mail=success#contact");
} else {
  header("Location: index.html?mail=fail#contact");
}
exit;
?>
