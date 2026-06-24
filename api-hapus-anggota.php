<?php
error_reporting(0);
header("Content-Type: application/json");
require 'koneksi.php';

$data = json_decode(file_get_contents("php://input"));
if(isset($data->nik)) {
    $nik = mysqli_real_escape_string($koneksi, $data->nik);
    
    $query = "DELETE FROM anggota WHERE NIK='$nik'";
    if(mysqli_query($koneksi, $query)) { echo json_encode(["status" => "success"]); } 
    else { echo json_encode(["status" => "error"]); }
}
?>