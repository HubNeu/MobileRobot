<?php

class Controller
{
    protected $view;

    function __construct($params)
    {
        $this->view = new View();

        if (!isset($params[1]))
            $params[1] = 'main'; //TODO ustawić domyślną stronę

        $file = 'views/' . $params[0] . '/' . $params[1] . '.php';

        if (file_exists($file))
        {
            $file = 'models/' . $params[0] . '_model.php';

            if (file_exists($file))
            {
                $this->view->controller = $params[0];
                $this->view->page = $params[1];

                require_once $file;
            }
            else
            {
                $this->view->controller = 'common';
                $this->view->page = 'error';
                $this->view->body['externalError'][] = 404;
                $this->view->body['internalError'][] = 'File: ' . __FILE__ . '<br>' .
                    'Method: ' . __METHOD__ . '<br>' .
                    'Details: file "' . $file . '" does not exist';
            }
        }
        else
        {
            $this->view->controller = 'common';
            $this->view->page = 'error';
            $this->view->body['externalError'][] = 404;
            $this->view->body['internalError'][] = 'File: ' . __FILE__ . '<br>' .
                'Method: ' . __METHOD__ . '<br>' .
                'Details: file "' . $file . '" does not exist';
        }
    }
}