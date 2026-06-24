<?php
error_reporting(0);
header("Content-Type: application/json");
require 'koneksi.php';

$data = json_decode(file_get_contents("php://input"));
if(isset($data->nik) && isset($data->nama) && isset($data->telp) && isset($data->alamat)) {
    $nik = mysqli_real_escape_string($koneksi, $data->nik);
    $nama = mysqli_real_escape_string($koneksi, $data->nama);
    $telp = mysqli_real_escape_string($koneksi, $data->telp);
    $alamat = mysqli_real_escape_string($koneksi, $data->alamat);
    
    $status = isset($data->status) ? mysqli_real_escape_string($koneksi, $data->status) : 'aktif';
    $query = "UPDATE anggota SET Nama_Lengkap='$nama', No_HP='$telp', Alamat='$alamat', Status='$status' WHERE NIK='$nik'";
    
    if(mysqli_query($koneksi, $query)) { echo json_encode(["status" => "success"]); } 
    else { echo json_encode(["status" => "error"]); }
}
?>