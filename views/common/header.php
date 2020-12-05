<?php global $path; ?>
<!DOCTYPE html>
<!--
        AUTHOR
    Oskar Zborowski
-->
<html lang="pl">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
	<meta name="author" content="Oskar Zborowski">
    <meta name="description" content="Praca inżynierska"> <!-- TODO uzupełnić o końcowy temat pracy inżynierskiej -->
    <meta name="keywords" content="praca inżynierska, inżynierka"> <!-- TODO jw. -->
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>Praca inżynierska</title> <!-- TODO jw. -->
	<link rel="Shortcut icon" href="<?= $path ?>img/diploma-icon.png">
	<link rel="stylesheet" href="<?= $path ?>css/bootstrap.min.css">
	<?php
		switch ($this->controller)
		{
			case 'dashboard':
			default:
				echo '<link rel="stylesheet" href="' . $path . 'css/dashboard.css?' . mt_rand() . '">';
				break;
			case 'login':
				echo '<link rel="stylesheet" href="' . $path . 'css/login.min.css">';
				break;
		}
	?>
</head>
<body>
	<div id="container">