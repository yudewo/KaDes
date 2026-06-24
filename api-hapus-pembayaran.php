<?php
error_reporting(0);
header("Content-Type: application/json");
require 'koneksi.php';

$data = json_decode(file_get_contents("php://input"));
if(isset($data->id)) {
    $id = (int)$data->id;
    $query = "DELETE FROM pembayaran WHERE id_pembayaran=$id";
    
    if(mysqli_query($koneksi, $query)) { echo json_encode(["status" => "success"]); }
    else { echo json_encode(["status" => "error"]); }
}
?>