<?php

if (isset($_GET['enable']))
{
	if ($_GET['enable'] == 'true')
	{
		$file = fopen('config.txt', 'r');
		$data = fread($file, filesize('config.txt'));
		fclose($file);
		if ($data == 'disable disable')
		{
			$file = fopen('config.txt', 'w');
			fputs($file, 'enable enable');
			fclose($file);
			system('nohup bash ../bash/orientation.sh >/dev/null 2>&1 &');
		}
	}
	else if ($_GET['enable'] == 'false')
	{
		$file = fopen('config.txt', 'w');
		fputs($file, 'disable disable');
		fclose($file);
	}
}
else
{
	$file = fopen('config.txt', 'r');
	$data = fread($file, filesize('config.txt'));
	fclose($file);
	if ($data == 'enable enable')
	{
		$file = fopen('config.txt', 'w');
		fputs($file, 'enable disable');
		fclose($file);
		usleep(100000);
		$file = fopen('orientation.txt', 'r');
		$data = fread($file, filesize('orientation.txt'));
		fclose($file);
		$file = fopen('config.txt', 'w');
		fputs($file, 'enable enable');
		fclose($file);
		$data = explode(' ', $data);
		$package = array('ax' => $data[0], 'ay' => $data[1], 'az' => $data[2]);
		echo json_encode($package);
	}
}