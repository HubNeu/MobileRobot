<?php

session_start();

require_once '../mvc/model.php';

$model = new Model();
$query = $model->insert('logs', 'id, id_user, action, datetime', 'NULL, ' . $_SESSION['user_id'] . ', "logout", "' . date('Y-m-d H:i:s') . '"');

unset($_SESSION['user_id']);
unset($_SESSION['user_name']);
unset($_SESSION['user_status']);
unset($_SESSION['user_permissions']);
unset($_SESSION['website']);

header('Location: ../login');