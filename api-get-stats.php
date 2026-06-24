<?php
error_reporting(0);
header("Content-Type: application/json");
require 'koneksi.php';

// 1. Tarik Data Jumlah Anggota dari Database
$query_total = mysqli_query($koneksi, "SELECT COUNT(*) as total FROM anggota");
$total_anggota = mysqli_fetch_assoc($query_total)['total'];

$query_aktif = mysqli_query($koneksi, "SELECT COUNT(*) as aktif FROM anggota WHERE LOWER(Status) = 'aktif'");
$anggota_aktif = mysqli_fetch_assoc($query_aktif)['aktif'];

$query_tidak_aktif = mysqli_query($koneksi, "SELECT COUNT(*) as tidak_aktif FROM anggota WHERE LOWER(Status) != 'aktif'");
$anggota_tidak_aktif = mysqli_fetch_assoc($query_tidak_aktif)['tidak_aktif'];

// 2. Tarik Data Keuangan REAL dari tabel kas_desa
$query_masuk = mysqli_query($koneksi, "SELECT SUM(Nominal) as masuk FROM kas_desa WHERE jenis = 'Kas Masuk'");
$data_masuk = mysqli_fetch_assoc($query_masuk);
$pemasukan = $data_masuk['masuk'] ? (int)$data_masuk['masuk'] : 0;

$query_keluar = mysqli_query($koneksi, "SELECT SUM(Nominal) as keluar FROM kas_desa WHERE jenis = 'Kas Keluar'");
$data_keluar = mysqli_fetch_assoc($query_keluar);
$pengeluaran = $data_keluar['keluar'] ? (int)$data_keluar['keluar'] : 0;

$saldo = $pemasukan - $pengeluaran;

echo json_encode([
    "status" => "success",
    "anggota" => [
        "total" => $total_anggota,
        "aktif" => $anggota_aktif,
        "tidak_aktif" => $anggota_tidak_aktif
    ],
    "keuangan" => [
        "total_pemasukan" => $pemasukan,
        "total_pengeluaran" => $pengeluaran,
        "saldo_kas" => $saldo
    ]
]);
?>