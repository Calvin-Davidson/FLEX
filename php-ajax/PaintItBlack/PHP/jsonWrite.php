<?php

$x = $_REQUEST["x"];
$y = $_REQUEST["y"];
$color = $_REQUEST["color"];

$jsonString = file_get_contents('drawing.json');
$data = json_decode($jsonString, true);

foreach ($data as $key => $value){
    if ($value['x'] == $x) {
        if ($value['y'] == $y) {
            $data[$key]['color'] = (int) $color;
        }
    }
}

$newJsonString = json_encode($data);
echo "Updated server json succesfully";
file_put_contents('drawing.json', $newJsonString);

return;
?>