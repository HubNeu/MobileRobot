<?php

for ($i=0; isset($this->body['externalError'][$i]); $i++)
{
    switch ($this->body['externalError'][$i])
    {
        case 404:
            $this->body['errorMessage'][$i] = 'Page not found';
            $this->body['errorForwarding'] = 'views/common/pageNotFound.php';
            break;
    }
}

if (file_exists($this->body['errorForwarding']))
    require_once $this->body['errorForwarding'];
else
{
    $this->body['internalError'][0] = 'Details: file "' . $this->body['errorForwarding'] . '" does not exist';
        '<br>File: ' . __FILE__;
    $this->body['externalError'][0] = 404;
    $this->body['errorMessage'][0] = 'Page not found';

    echo '<pre>Error ' . $this->body['externalError'][0] . '</pre>
        <pre>' . $this->body['errorMessage'][0] . '</pre>
        <pre>' . $this->body['internalError'][0] . '</pre>';
}