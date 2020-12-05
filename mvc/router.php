<?php

class Router
{
    function __construct()
    {
        global $DEFAULT_CONTROLLER;
        global $DEFAULT_PAGE;
        global $view;
        global $path;

        $path = '';
        $length = strlen($_GET['q']);

        if ($_GET['q'][$length-1] == '/')
            $path .= '../';

        $q = rtrim($_GET['q'], '/');
        $params = explode('/', $q);

        for ($i=0; isset($params[$i]); $i++)
        {
            $params[$i] = strtolower($params[$i]);

            if ($i > 0)
                $path .= '../';
        }

        if ($params[0] == 'index.php')
            $params[0] = $DEFAULT_CONTROLLER;

        if (!isset($params[1]) && isset($DEFAULT_PAGE[$params[0]]))
            $params[1] = $DEFAULT_PAGE[$params[0]];

        if (isset($params[1]))
        {
            $file = 'views/' . $params[0] . '/' . $params[1] . '.php';

            if (file_exists($file))
            {
                require_once 'controllers/' . $params[0] . '.php';

                $controller = ucfirst($params[0]);
                new $controller($params);

                $view->controller = $params[0];
                $view->page = $params[1];
            }
        }
    }
}