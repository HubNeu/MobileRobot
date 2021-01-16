<?php

class View
{
    public $controller;
    public $page;
    public $body;

    public function render()
    {
        require_once 'views/common/header.php';

        $file = 'views/' . $this->controller . '/' . $this->page . '.php';

        if (file_exists($file))
            require_once $file;
        else
        {
            $this->body['externalError'][] = 404;
            $this->body['internalError'][] = 'File: ' . __FILE__ . '<br>' .
                'Method: ' . __METHOD__ . '<br>' .
                'Details: file "' . $file . '" does not exist';

            $file = 'views/common/error.php';
            require_once $file;
        }

        require_once 'views/common/footer.php';
    }
}