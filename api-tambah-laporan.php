<?php
error_reporting(0);
header("Content-Type: application/json");
require 'koneksi.php';

$data = json_decode(file_get_contents("php://input"));

if(isset($data->ket) && isset($data->jenis) && isset($data->jumlah) && isset($data->tgl)) {
    $id = 'TRX-' . time(); 
    $ket = mysqli_real_escape_string($koneksi, $data->ket);
    
    // DIPERBAIKI: Langsung tangkap value "Kas Masuk" atau "Kas Keluar" yang dikirim HTML
    $jenis_input = $data->jenis;
    $jenis = (strpos(strtolower($jenis_input), 'masuk') !== false) ? 'Kas Masuk' : 'Kas Keluar';
    
    $jumlah = (int)$data->jumlah;
    $tgl = mysqli_real_escape_string($koneksi, $data->tgl);
    
    $query = "INSERT INTO kas_desa (id_transaksi, tanggal, keterangan, jenis, Nominal, NIK_anggota, id_admin) VALUES ('$id', '$tgl', '$ket', '$jenis', $jumlah, '00001', 1)";
    
    if(mysqli_query($koneksi, $query)) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => mysqli_error($koneksi)]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Data tidak lengkap"]);
}
?>