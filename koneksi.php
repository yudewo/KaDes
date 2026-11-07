<?php
$host = "localhost";
$user = "root";
$pass = ""; 
$db   = "yudew_kades"; 

$koneksi = mysqli_connect($host, $user, $pass, $db);
if (!$koneksi) {
    die("Koneksi database gagal: " . mysqli_connect_error());
}
?>
