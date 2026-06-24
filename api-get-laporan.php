<?php
error_reporting(0);
header("Content-Type: application/json");
require 'koneksi.php';

// Mengambil data dari tabel kas_desa
$query = mysqli_query($koneksi, "SELECT * FROM kas_desa ORDER BY tanggal DESC");
$data = [];

if ($query) {
    while ($row = mysqli_fetch_assoc($query)) {
        $jenis_bersih = (strpos(strtolower($row['jenis']), 'masuk') !== false) ? 'Masuk' : 'Keluar';
        
        $data[] = [
            'id' => $row['id_transaksi'],
            'tgl' => $row['tanggal'],
            'ket' => $row['keterangan'],
            'jenis' => $jenis_bersih,
            'jumlah' => (int)$row['Nominal']
        ];
    }
    echo json_encode(["status" => "success", "data" => $data]);
} else {
    echo json_encode(["status" => "error", "message" => mysqli_error($koneksi)]);
}
?>