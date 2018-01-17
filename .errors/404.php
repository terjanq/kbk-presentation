<?php
// header("X-XSS-Protection: 0");
$uri = urldecode($_SERVER['REQUEST_URI']);
?>

<h1>Error 404</h1>
<p> Strona o podanym adresie <?=$uri?> nie istnieje</p><div id="x"></div>