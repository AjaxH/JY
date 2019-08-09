<?php


$num = isset($_POST['num']) ? $_POST['num'] : '' ;
$name = isset($_POST['name']) ? $_POST['name'] : '' ;
$id = isset($_POST['id']) ? $_POST['id'] : '' ;
$a = isset($_POST['a']) ? $_POST['a'] : '' ;


include 'conn.php';

if($a == 1){
    $sql = " UPDATE goods SET num=$num WHERE name='$name' AND gid=$id";
    $res = $conn->query($sql);
}else if($a == 2){
    $collocation = isset($_POST['collocation']) ? $_POST['collocation'] : '' ;
    $standard = isset($_POST['standard']) ? $_POST['standard'] : '' ;
    $sql = "DELETE FROM goods WHERE `name`=$name AND gid=$id AND collocation='$collocation' AND `standard`='$standard'";
    $res = $conn->query($sql);
}

?>
