<?php


function getRealIpAddr()
{
    if (!empty($_SERVER['HTTP_CLIENT_IP']))   //check ip from share internet
    {
      $ip=$_SERVER['HTTP_CLIENT_IP'];
    }
    elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))   //to check ip is pass from proxy
    {
      $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    else
    {
      $ip=$_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}


$ip = getRealIpAddr();

$who = $_GET['who'];
file_put_contents("logs.txt", $who."\t".$ip.PHP_EOL, FILE_APPEND);

header("Location: https://media3.giphy.com/media/3oEjHP8ELRNNlnlLGM/giphy.gif"); 
exit();

?>