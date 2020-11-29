<?php

$DEFAULT_CONTROLLER = 'start';
$DEFAULT_PAGE['start'] = 'main';

require_once 'libs/router.php';
require_once 'libs/controller.php';
require_once 'libs/model.php';
require_once 'libs/view.php';

$view = new View;
$router = new Router;

$view->render();