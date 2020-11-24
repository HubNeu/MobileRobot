<?php

class Start extends Controller
{
    private $model;

    function __construct($params)
    {
        parent::__construct($params);

        if ($this->view->page != 'error')
        {
            $controller = ucfirst($this->view->controller) . '_model';

            if (class_exists($controller))
            {
                $this->model = new $controller();
    
                $action = $this->view->page;
                $this->$action();
            }
            else
            {
                $this->view->controller = 'common';
                $this->view->page = 'error';
                $this->view->body['externalError'][] = 404;
                $this->view->body['internalError'][] = 'File: ' . __FILE__ . '<br>' .
                    'Method: ' . __METHOD__ . '<br>' .
                    'Details: class "' . $controller . '" does not exist';
            }
        }

        $this->view->render();
    }

    private function main()
    {
        $this->view->body['message'] = $this->model->sampleMethod();
    }
}