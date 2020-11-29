<?php

class View
{
    public $controller;
    public $page;
    public $body;

    public function render()
    {
        require_once 'views/common/header.php';

        if (!isset($this->controller) || !isset($this->page))
        {
            $this->controller = 'common';
            $this->page = 'error';
        }
        else
        {
            $file = 'views/' . $this->controller . '/' . $this->page . '.php';

            if (!file_exists($file))
            {
                $this->controller = 'common';
                $this->page = 'error';
                $this->body['internalError'][0] = 'Details: file "' . $file . '" does not exist' .
                    '<br>File: ' . __FILE__ .
                    '<br>Method: ' . __METHOD__;
                $this->body['externalError'][0] = 404;
            }
        }

        $file = 'views/' . $this->controller . '/' . $this->page . '.php';
        require_once $file;

        require_once 'views/common/footer.php';
    }
}