<?php
header("Content-Type: application/json");
require 'koneksi.php';

// Ambil data yang dikirim dari form HTML
$data = json_decode(file_get_contents("php://input"));

if(isset($data->nik)) {
    $nik_input = mysqli_real_escape_string($koneksi, $data->nik);
    $pass_input = mysqli_real_escape_string($koneksi, $data->password);

    // Cari warga berdasarkan NIK
    $query = "SELECT * FROM warga WHERE nik = '$nik_input'";
    $result = mysqli_query($koneksi, $query);

    if (mysqli_num_rows($result) > 0) {
        $warga = mysqli_fetch_assoc($result);
        
        // Cek password(password_hash)
        if ($pass_input === $warga['password']) {
            echo json_encode(["status" => "success", "nama" => $warga['nama']]);
        } else {
            echo json_encode(["status" => "error", "pesan" => "Password yang Anda masukkan salah!"]);
        }
    } else {
        echo json_encode(["status" => "error", "pesan" => "NIK tidak terdaftar di sistem desa."]);
    }
} else {
    echo json_encode(["status" => "error", "pesan" => "Data tidak lengkap."]);
}
?>
