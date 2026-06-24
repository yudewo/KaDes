<?php
error_reporting(0);
header("Content-Type: application/json");
require 'koneksi.php';

$data = json_decode(file_get_contents("php://input"));

if(isset($data->username) && isset($data->password)) {
    $username = mysqli_real_escape_string($koneksi, $data->username);
    $password = mysqli_real_escape_string($koneksi, $data->password);

    $query = "SELECT * FROM admin WHERE Username = '$username'";
    $result = mysqli_query($koneksi, $query);

    if (mysqli_num_rows($result) > 0) {
        $admin = mysqli_fetch_assoc($result);

        if ($password === $admin['Password']) {
            echo json_encode(["status" => "success", "nama" => $admin['Nama_Lengkap']]);
        } else {
            echo json_encode(["status" => "error", "pesan" => "Password Admin salah!"]);
        }
    } else {
        echo json_encode(["status" => "error", "pesan" => "Username Admin tidak terdaftar!"]);
    }
} else {
    echo json_encode(["status" => "error", "pesan" => "Data tidak lengkap!"]);
}
?>