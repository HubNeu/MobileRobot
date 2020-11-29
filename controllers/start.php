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
                $action = $this->page;
                $this->$action();
            }
            else
            {
                $view->body['internalError'][0] = 'Details: method "' . $this->page . '()" does not exist in file "controllers/' . $this->controller . '.php"' .
                    '<br>File: ' . __FILE__ .
                    '<br>Method: ' . __METHOD__;
                $view->body['externalError'][0] = 404;
            }
        }
    }

    private function main()
    {
        global $view;

        $model = ucfirst($this->controller) . '_model';
        $method = 'sampleMethod';

        if (method_exists($model, $method))
            $view->body['message'] = $this->model->$method();
        else
        {
            $error = true;
            $view->body['internalError'][0] = 'Details: method "' . $method . '()" does not exist in file "models/' . $this->controller . '_model.php"' .
                '<br>File: ' . __FILE__ .
                '<br>Method: ' . __METHOD__;
            $view->body['externalError'][0] = 404;
        }

        if (!isset($error))
        {
            $view->controller = $this->controller;
            $view->page = $this->page;
        }
    }
}