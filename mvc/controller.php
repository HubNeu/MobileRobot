<?php

class Controller
{
    protected $model;

    function __construct($params)
    {
        $file = 'models/' . $params[0] . '_model.php';

        if (file_exists($file))
        {
            require_once $file;

            $model = ucfirst($params[0]) . '_model';
            $this->model = new $model();
        }
    }
}