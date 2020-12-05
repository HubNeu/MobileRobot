<?php

session_start();

if (isset($_GET['streaming']))
{
    switch ($_GET['streaming'])
    {
        case 'status':
            if (!isset($_SESSION['CAMERA-STATUS']))
                $_SESSION['CAMERA-STATUS'] = true;
            break;
        case 'on':
            $_SESSION['CAMERA-STATUS'] = true;
            break;
        case 'off':
            $_SESSION['CAMERA-STATUS'] = false;
            break;
    }

    if ($_SESSION['CAMERA-STATUS'])
    {
        shell_exec('sudo bash ../bash/streaming_on.sh');
        sleep(3);
        echo 'http://192.168.43.95:8081';
    }
    else
    {
        shell_exec('sudo bash ../bash/streaming_off.sh');
        sleep(3);
        echo 'OFF';
    }
}
else if (isset($_GET['shutdown']) && $_GET['shutdown'] == 'true')
	shell_exec('sudo bash ../bash/shutdown.sh');

