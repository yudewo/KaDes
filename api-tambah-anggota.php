<?php
error_reporting(0);
header("Content-Type: application/json");
require 'koneksi.php';

$data = json_decode(file_get_contents("php://input"));
if(isset($data->nama) && isset($data->telp) && isset($data->alamat)) {
    $nik = str_pad(mt_rand(1, 99999), 5, '0', STR_PAD_LEFT); 
    $id_anggota = '#A-' . mt_rand(100, 999);
    
    $nama = mysqli_real_escape_string($koneksi, $data->nama);
    $telp = mysqli_real_escape_string($koneksi, $data->telp);
    $alamat = mysqli_real_escape_string($koneksi, $data->alamat);

    $status = isset($data->status) ? mysqli_real_escape_string($koneksi, $data->status) : 'aktif';
    
    $email = strtolower(str_replace(' ', '', $nama)) . "@gmail.com";
    $password = "warga123";
    
    $query = "INSERT INTO anggota (NIK, id_anggota, Nama_Lengkap, No_HP, Alamat, email, Password, Status) 
              VALUES ('$nik', '$id_anggota', '$nama', '$telp', '$alamat', '$email', '$password', '$status')";
              
    if(mysqli_query($koneksi, $query)) { echo json_encode(["status" => "success"]); } 
    else { echo json_encode(["status" => "error", "message" => mysqli_error($koneksi)]); }
}
?>