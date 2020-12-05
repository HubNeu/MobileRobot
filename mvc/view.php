<?php

class View
{
    public $controller;
    public $page;
    public $body;

    public function render()
    {
        require_once 'views/common/header.php';

        if (!isset($this->controller))
            require_once 'views/common/pageNotFound.php';
        else
            require_once 'views/' . $this->controller . '/' . $this->page . '.php';

        require_once 'views/common/footer.php';
    }
}