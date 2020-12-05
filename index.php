<?php

$DEFAULT_CONTROLLER = 'dashboard';
$DEFAULT_PAGE['dashboard'] = 'panel';

require_once 'mvc/router.php';
require_once 'mvc/controller.php';
require_once 'mvc/model.php';
require_once 'mvc/view.php';

$view = new View;
$router = new Router;

$view->render();