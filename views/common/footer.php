    </div>
    <script src="<?= $path ?>js/jquery.min.js"></script>
	<script src="<?= $path ?>js/bootstrap.bundle.min.js"></script>
    <script src="<?= $path ?>js/ajax.js"></script>
    <script><?= 'let path = "' . $path . '";'; ?></script>
    <script><?= 'let website = "' . $_SESSION['website'] . '";'; ?></script>
    <?php
        switch ($this->controller)
        {
            case 'dashboard':
                echo '<script src="' . $path . 'js/streaming.js?' . mt_rand() . '"></script>';
                break;
            case 'login':
                echo '<script src="' . $path . 'js/login.js?' . mt_rand() . '"></script>';
                break;
	    case 'orientation':
		echo '<script src="' . $path . 'js/three.min.js"></script>';
		echo '<script src="' . $path . 'js/orientation.js?' . mt_rand() . '"></script>';
		break;
        }
    ?>
</body>
</html>