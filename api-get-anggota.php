<?php
error_reporting(0);
header("Content-Type: application/json");
require 'koneksi.php';

$query = "SELECT * FROM anggota";
$result = mysqli_query($koneksi, $query);

$data_anggota = [];
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $data_anggota[] = $row;
    }
}

echo json_encode(["status" => "success", "data" => $data_anggota]);
?>