<?php
error_reporting(0);
header("Content-Type: application/json");
require 'koneksi.php';

$query = "SELECT * FROM pembayaran ORDER BY tanggal_bayar DESC";
$result = mysqli_query($koneksi, $query);

$data = [];
if($result) {
    while($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
}

echo json_encode($data);
?>