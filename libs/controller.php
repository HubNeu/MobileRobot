<?php

class Controller
{
    protected $view;
    protected $model;

    function __construct($params)
    {
        $this->view = new View();

        if (!isset($params[1]))
            $params[1] = 'main'; //TODO default page

        $file = 'views/' . $params[0] . '/' . $params[1] . '.php';

        if (file_exists($file))
        {
            $file = 'models/' . $params[0] . '_model.php';

            if (file_exists($file))
            {
                require_once $file;

                $controller = ucfirst($params[0]) . '_model';

                if (class_exists($controller))
                {
                    $this->view->controller = $params[0];
                    $this->view->page = $params[1];

                    $this->model = new $controller();
                }
                else
                    $this->view->body['internalError'][0] = 'File: ' . __FILE__ . '<br>' .
                        'Method: ' . __METHOD__ . '<br>' .
                        'Details: class "' . $controller . '" does not exist';
            }
            else
                $this->view->body['internalError'][0] = 'File: ' . __FILE__ . '<br>' .
                    'Method: ' . __METHOD__ . '<br>' .
                    'Details: file "' . $file . '" does not exist';
        }
        else
            $this->view->body['internalError'][0] = 'File: ' . __FILE__ . '<br>' .
                'Method: ' . __METHOD__ . '<br>' .
                'Details: file "' . $file . '" does not exist';

        if (!isset($this->model))
        {
            $this->view->controller = 'common';
            $this->view->page = 'error';
            $this->view->body['externalError'][0] = 404;
        }
    }
}