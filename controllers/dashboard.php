<?php

class Dashboard extends Controller
{
    function __construct($params)
    {
        parent::__construct($params);

        $page = $params[1];
        $this->$page();
    }

    private function panel()
    {
        global $view;
        $view->body['text'] = $this->model->sampleMethod();
    }
}