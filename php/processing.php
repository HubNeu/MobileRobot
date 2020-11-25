<?php

session_start();

if (isset($_GET['streaming']))
{
    if ($_GET['streaming'] == 'state')
    {
        if (!isset($_SESSION['STATE-CAMERA']))
            $_SESSION['STATE-CAMERA'] = true;

        echo $_SESSION['STATE-CAMERA'];
    }
    else if ($_GET['streaming'] == 'on')
    {
        $_SESSION['STATE-CAMERA'] = true;
        echo 'http://192.168.43.95:8081';
    }
    else if ($_GET['streaming'] == 'off')
        $_SESSION['STATE-CAMERA'] = false;
}