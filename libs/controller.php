<?php

class Controller
{
    protected $controller;
    protected $page;
    protected $model;

    function __construct($params)
    {
        global $DEFAULT_PAGE;
        global $view;

        $this->controller = $params[0];

        if (!isset($params[1]))
            $params[1] = $DEFAULT_PAGE[$this->controller];

        $this->page = $params[1];

        $file = 'models/' . $this->controller . '_model.php';

        if (file_exists($file))
        {
            require_once $file;

            $model = ucfirst($this->controller) . '_model';

            if (class_exists($model))
                $this->model = new $model();
            else
                $view->body['internalError'][0] = 'Details: class "' . $model . '" does not exist';
        }
        else
            $view->body['internalError'][0] = 'Details: file "' . $file . '" does not exist';

        if (!isset($this->model))
        {
            $view->body['internalError'][0] .= '<br>File: ' . __FILE__ .
                '<br>Method: ' . __METHOD__;
            $view->body['externalError'][0] = 404;
        }
    }
}