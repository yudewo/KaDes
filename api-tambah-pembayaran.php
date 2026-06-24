<?php
error_reporting(0);
header("Content-Type: application/json");
require 'koneksi.php';

$data = json_decode(file_get_contents("php://input"));
if(isset($data->nik) && isset($data->bulan) && isset($data->nominal) && isset($data->status) && isset($data->tanggal)) {
    $nik = mysqli_real_escape_string($koneksi, $data->nik);
    $bulan = mysqli_real_escape_string($koneksi, $data->bulan);
    $nominal = (int)$data->nominal;
    $status = mysqli_real_escape_string($koneksi, $data->status);
    $tanggal = mysqli_real_escape_string($koneksi, $data->tanggal);

    $query = "INSERT INTO pembayaran (NIK_anggota, bulan_tahun, nominal, Status, tanggal_bayar) VALUES ('$nik', '$bulan', $nominal, '$status', '$tanggal')";

    if(mysqli_query($koneksi, $query)) { echo json_encode(["status" => "success"]); }
    else { echo json_encode(["status" => "error", "message" => mysqli_error($koneksi)]); }
}
?>