<?php

class Start extends Controller
{
    function __construct($params)
    {
        parent::__construct($params);

        global $view;

        if (isset($this->model))
        {
            if (method_exists(ucfirst($this->controller), $this->page))
            {
                $view->controller = $this->controller;
                $view->page = $this->page;

                $action = $this->page;
                $this->$action();
            }
            else
            {
                $view->body['internalError'][0] = 'Details: function "' . $this->page . '()" does not exist' .
                    '<br>File: ' . __FILE__ .
                    '<br>Method: ' . __METHOD__;
                $view->body['externalError'][0] = 404;
            }
        }
    }

    private function main()
    {
        global $view;
        $view->body['message'] = $this->model->sampleMethod();
    }
}