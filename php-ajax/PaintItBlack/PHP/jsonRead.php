<?php
    $jsonString = file_get_contents('drawing.json');
    $data = json_decode($jsonString, true);

    echo $jsonString;
?>
