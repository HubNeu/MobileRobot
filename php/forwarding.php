<?php

session_start();

global $DEFAULT_CONTROLLER, $DEFAULT_PAGE, $path;

$q = rtrim($_GET['q'], '/');
$params = explode('/', $q);

for ($i=0; isset($params[$i]); $i++)
	$params[$i] = strtolower($params[$i]);

if ($params[0] == 'index.php')
	$params[0] = $DEFAULT_CONTROLLER;

if ($params[0] != 'login')
{
	$_SESSION['website'] = '';

	for ($i=0; isset($params[$i]); $i++)
	{
		$_SESSION['website'] .= $params[$i];

		if (isset($params[$i+1]))
			$_SESSION['website'] .= '/';
	}

	if (!isset($params[2]))
	{
		if (isset($DEFAULT_PAGE[$params[0]]))
			if ($_SESSION['website'] == $params[0] . '/' . $DEFAULT_PAGE[$params[0]])
				$_SESSION['website'] = $params[0];
	}
}
else if (!isset($_SESSION['website']))
	$_SESSION['website'] = $DEFAULT_CONTROLLER;

if ($params[0] == 'login' && isset($_SESSION['user_id']))
{
	header('Location: ' . $path . $_SESSION['website']);
	exit();
}
else if ($params[0] != 'login' && !isset($_SESSION['user_id']))
{
	if (isset($params[1]))
		$file = 'views/' . $params[0] . '/' . $params[1] . '.php';
	else
		$file = 'views/' . $params[0] . '/' . $DEFAULT_PAGE[$params[0]] . '.php';

	if (file_exists($file))
	{
		header('Location: ' . $path . 'login');
		exit();
	}
}