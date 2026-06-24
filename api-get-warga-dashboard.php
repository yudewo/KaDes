<?php
error_reporting(0);
header("Content-Type: application/json");
require 'koneksi.php';

$pemasukan = 0;
$pengeluaran = 0;
$iuran_terbayar = 0;

$nik_warga = isset($_GET['nik']) ? mysqli_real_escape_string($koneksi, $_GET['nik']) : '';

// 1. Ambil Pemasukan
$query_masuk = mysqli_query($koneksi, "SELECT SUM(Nominal) as masuk FROM kas_desa WHERE jenis = 'Kas Masuk'");
if($query_masuk) {
    $row = mysqli_fetch_assoc($query_masuk);
    if($row['masuk']) {
        $pemasukan = (int)$row['masuk'];
    }
}

// 2. Ambil Pengeluaran
$query_keluar = mysqli_query($koneksi, "SELECT SUM(Nominal) as keluar FROM kas_desa WHERE jenis = 'Kas Keluar'");
if($query_keluar) {
    $row = mysqli_fetch_assoc($query_keluar);
    if($row['keluar']) {
        $pengeluaran = (int)$row['keluar'];
    }
}

$saldo = $pemasukan - $pengeluaran;

// 3. Hitung Iuran Warga Login
if ($nik_warga !== '') {
    $query_iuran = mysqli_query($koneksi, "SELECT SUM(nominal) as total_nominal FROM pembayaran WHERE NIK_anggota = '$nik_warga' AND LOWER(Status) = 'lunas'");
    if($query_iuran) {
        $row_iuran = mysqli_fetch_assoc($query_iuran);
        $total_nominal = (int)$row_iuran['total_nominal'];
        $iuran_terbayar = floor($total_nominal / 50000); 
    }
}

// 4. Ambil Transaksi (Masuk dan Keluar)
$data_transaksi = [];
$query_transaksi = mysqli_query($koneksi, "SELECT tanggal, keterangan, Nominal, jenis FROM kas_desa ORDER BY tanggal DESC");
if($query_transaksi) {
    while ($row = mysqli_fetch_assoc($query_transaksi)) {
        $data_transaksi[] = [
            "tgl" => $row['tanggal'],
            "ket" => $row['keterangan'],
            "nominal" => (int)$row['Nominal'],
            "jenis" => $row['jenis']
    }
}

echo json_encode([
    "status" => "success",
    "statistik" => [
        "saldo" => $saldo,
        "pengeluaran" => $pengeluaran,
        "iuran_terbayar" => $iuran_terbayar
    ],
    "transparansi" => $data_transaksi
]);
?>