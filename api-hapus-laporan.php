<?php
error_reporting(0);
header("Content-Type: application/json");
require 'koneksi.php';

$data = json_decode(file_get_contents("php://input"));

if(isset($data->id)) {
    $id = mysqli_real_escape_string($koneksi, $data->id);
    $query = "DELETE FROM kas_desa WHERE id_transaksi='$id'";
    
    if(mysqli_query($koneksi, $query)) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => mysqli_error($koneksi)]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "ID transaksi tidak valid"]);
}
?>