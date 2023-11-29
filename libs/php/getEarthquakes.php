<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);

if (isset($_REQUEST['north']) && !empty($_REQUEST['north']) &&
    isset($_REQUEST['south']) && !empty($_REQUEST['south']) &&
    isset($_REQUEST['east']) && !empty($_REQUEST['east']) &&
    isset($_REQUEST['west']) && !empty($_REQUEST['west'])) {

    $url = 'http://api.geonames.org/earthquakesJSON?north=' . $_REQUEST['north'] .
        '&south=' . $_REQUEST['south'] .
        '&east=' . $_REQUEST['east'] .
        '&west=' . $_REQUEST['west'] .
        '&username=simban6';

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, $url);

    $result = curl_exec($ch);

    curl_close($ch);

    $decode = json_decode($result, true);

    $output["status"]["code"] = "200";
    $output["status"]["name"] = "ok";
    $output["status"]["description"] = "success";
    $output["status"]["returnedIn"] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    $output["data"] = $decode;

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($output);
} else {
    $errorOutput["status"]["code"] = "400";
    $errorOutput["status"]["name"] = "Bad Request";
    $errorOutput["status"]["description"] = "Missing or empty parameters";

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($errorOutput);
}
?>

