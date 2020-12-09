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
else if (isset($_GET['login']) || isset($_GET['password']))
{
    $status = '';

    if (isset($_GET['login']) && $_GET['login'] != '' && isset($_GET['password']) && $_GET['password'] != '')
    {
        require_once '../mvc/model.php';

        $model = new Model();
        $query = $model->select('id, name, surname, password, status, permissions', 'users', 'login="'.$_GET['login'].'"', false);

        if ($query)
        {
            if (password_verify($_GET['password'], $query['password']))
            {
                $_SESSION['user_id'] = $query['id'];
                $_SESSION['user_name'] = $query['name'] . ' ' . $query['surname'];
                $_SESSION['user_status'] = $query['status'];
                $_SESSION['user_permissions'] = $query['permissions'];

                $query = $model->insert('logs', 'id, id_user, action, datetime', 'NULL, ' . $_SESSION['user_id'] . ', "login", "' . date('Y-m-d H:i:s') . '"');
                $status = 'confirmed';
            }
            else
                $status = 'rejected';
        }
        else
            $status = 'rejected';
    }
    else
    {
        if (!isset($_GET['login']) || isset($_GET['login']) && $_GET['login'] == '')
            $status += 'emptyLogin';

        if (!isset($_GET['password']) || isset($_GET['password']) && $_GET['password'] == '')
            $status += 'emptyPassword';
    }

    echo $status;
}