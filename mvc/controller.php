<?php

class Controller
{
    protected $model;

    function __construct($params)
    {
        require_once 'models/' . $params[0] . '_model.php';

        $model = ucfirst($params[0]) . '_model';
        $this->model = new $model();
    }
}