<?php

class Router
{
    function __construct()
    {
        global $DEFAULT_CONTROLLER;
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

        $controller = $params[0];
        $file = 'controllers/' . $controller . '.php';

        if (file_exists($file))
        {
            require_once $file;

            $controller = ucfirst($controller);

            if (class_exists($controller))
                $request = new $controller($params);
            else
                $view->body['internalError'][0] = 'Details: class "' . $controller . '" does not exist in file "' . $file . '"';
        }
        else
            $view->body['internalError'][0] = 'Details: file "' . $file . '" does not exist';

        if (!isset($request))
        {
            $view->body['internalError'][0] .= '<br>File: ' . __FILE__ .
                '<br>Method: ' . __METHOD__;
            $view->body['externalError'][0] = 404;
        }
    }
}