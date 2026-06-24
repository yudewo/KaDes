<?php
error_reporting(0);
header("Content-Type: application/json");
require 'koneksi.php';

$data = json_decode(file_get_contents("php://input"));

if(isset($data->nik) && isset($data->password)) {
    $nik = mysqli_real_escape_string($koneksi, $data->nik);
    $password = mysqli_real_escape_string($koneksi, $data->password);

    $query = "SELECT * FROM anggota WHERE NIK = '$nik'";
    $result = mysqli_query($koneksi, $query);

    if (mysqli_num_rows($result) > 0) {
        $warga = mysqli_fetch_assoc($result);

        if (strtolower($warga['Status']) === 'tidak aktif') {
            echo json_encode(["status" => "error", "pesan" => "Akun tidak aktif! Hubungi Admin."]);
        } else if ($password === $warga['Password']) {
            // Berhasil login
            echo json_encode(["status" => "success", "nama" => $warga['Nama_Lengkap'], "nik" => $warga['NIK']]);
        } else {
            echo json_encode(["status" => "error", "pesan" => "Password Warga salah!"]);
        }
    } else {
        echo json_encode(["status" => "error", "pesan" => "NIK tidak ditemukan di database!"]);
    }
} else {
    echo json_encode(["status" => "error", "pesan" => "Data tidak lengkap!"]);
}
?>