<?php

class Model
{
    private $server;
    private $login;
    private $password;
    private $database;
    private $pdo;

    public function __construct()
    {
        $this->server = 'localhost';
        $this->login = 'root';
        $this->password = '';
        $this->database = 'mobile_robot';

        $this->connect();
    }

    private function connect()
    {
        global $view;
        $db = "mysql:host={$this->server}; dbname={$this->database}; charset=utf8";
        $options = [PDO::ATTR_EMULATE_PREPARES => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];

        try {
            $this->pdo = new PDO($db, $this->login, $this->password, $options);
        } catch (PDOException $e) {
            $view->body['errorNumber'] = 1;
        }
    }

    public function select($select = '*', $from, $where = null, $fetchAll = true)
    {
        $query = 'SELECT ' . $select . ' FROM ' . $from;

        if ($where != null) {
            $query .= ' WHERE ' . $where;
        }

        $selectQuery = $this->pdo->prepare($query);
        $selectQuery->execute();

        if ($fetchAll) {
            $select = $selectQuery->fetchAll();
        } else {
            $select = $selectQuery->fetch();
        }

        return $select;
    }

    public function insert($into, $columns, $values)
    {
        $query = 'INSERT INTO ' . $into . ' (' . $columns . ') VALUES (' . $values . ')';

        $updateQuery = $this->pdo->prepare($query);
        $updateQuery->execute();
    }
}
