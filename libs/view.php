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
        require_once $file;

        require_once 'views/common/footer.php';
    }
}