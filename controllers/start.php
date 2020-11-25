<?php

class Start extends Controller
{
    function __construct($params)
    {
        parent::__construct($params);

        if (isset($this->model))
        {
            $action = $this->view->page;
            $this->$action();
        }
   
        $this->view->render();
    }

    private function main()
    {
        $this->view->body['message'] = $this->model->sampleMethod();
    }
}