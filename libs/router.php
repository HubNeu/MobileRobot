<?php

class Router
{
    function __construct()
    {
        global $path;
        $path = '';

        $length = strlen($_GET['q']);

        if ($_GET['q'][$length-1] == '/')
            $path = '../';

        $q = rtrim($_GET['q'], '/');
        $params = explode('/', $q);

        for ($i=0; isset($params[$i]); $i++)
        {
            $params[$i] = strtolower($params[$i]);

            if ($i > 0)
                $path .= '../';
        }

        if ($params[0] == 'index.php')
            $params[0] = 'start'; //TODO ustawić domyślny kontroler

        $file = 'controllers/' . $params[0] . '.php';

        if (file_exists($file))
        {
            require_once $file;

            $controller = ucfirst($params[0]);

            if (class_exists($controller))
                $request = new $controller($params);
            else
            {
                $view = new View();
                $view->controller = 'common';
                $view->page = 'error';
                $view->body['externalError'][] = 404;
                $view->body['internalError'][] = 'File: ' . __FILE__ . '<br>' .
                    'Method: ' . __METHOD__ . '<br>' .
                    'Details: class "' . $controller . '" does not exist';
                $view->render();
            }
        }
        else
        {
            $view = new View();
            $view->controller = 'common';
            $view->page = 'error';
            $view->body['externalError'][] = 404;
            $view->body['internalError'][] = 'File: ' . __FILE__ . '<br>' .
                'Method: ' . __METHOD__ . '<br>' .
                'Details: file "' . $file . '" does not exist';
            $view->render();
        }
    }
}