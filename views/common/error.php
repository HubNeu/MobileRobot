<?php

for ($i=0; isset($this->body['externalError'][$i]); $i++)
{
    switch ($this->body['externalError'][$i])
    {
        case 404:
            $this->body['errorMessage'][] = 'Page not found';
            $this->body['errorForwarding'] = 'views/common/pageNotFound.php';
            break;
    }
}

require_once $this->body['errorForwarding'];