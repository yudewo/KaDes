<?php
error_reporting(0);
header("Content-Type: application/json");
require 'koneksi.php';

$data = json_decode(file_get_contents("php://input"));
if(isset($data->id) && isset($data->nik) && isset($data->bulan) && isset($data->nominal) && isset($data->status) && isset($data->tanggal)) {
    $id = (int)$data->id;
    $nik = mysqli_real_escape_string($koneksi, $data->nik);
    $bulan = mysqli_real_escape_string($koneksi, $data->bulan);
    $nominal = (int)$data->nominal;
    $status = mysqli_real_escape_string($koneksi, $data->status);
    $tanggal = mysqli_real_escape_string($koneksi, $data->tanggal);

    $query = "UPDATE pembayaran SET NIK_anggota='$nik', bulan_tahun='$bulan', nominal=$nominal, Status='$status', tanggal_bayar='$tanggal' WHERE id_pembayaran=$id";

    if(mysqli_query($koneksi, $query)) { echo json_encode(["status" => "success"]); }
    else { echo json_encode(["status" => "error"]); }
}
?>