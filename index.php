<?php

$DEFAULT_CONTROLLER = 'dashboard';
$DEFAULT_PAGE['dashboard'] = 'panel';
$DEFAULT_PAGE['login'] = 'panel';
$DEFAULT_PAGE['orientation'] = 'panel';
$DEFAULT_PAGE['settings'] = 'panel';
$DEFAULT_PAGE['credits'] = 'panel';

require_once 'mvc/router.php';
require_once 'mvc/controller.php';
require_once 'mvc/model.php';
require_once 'mvc/view.php';

$view = new View;
$router = new Router;

$view->render();
