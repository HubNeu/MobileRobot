    </div>
    <script src="<?= $path ?>js/jquery.min.js"></script>
    <script src="<?= $path ?>js/popper.min.js"></script>
	<script src="<?= $path ?>js/bootstrap.bundle.min.js"></script>
    <script src="<?= $path ?>js/ajax.js"></script>
    <script><?= 'let path = "' . $path . '";'; ?></script>
    <script><?= 'let website = "' . $_SESSION['website'] . '";'; ?></script>
    <?php
        switch ($this->controller) {
            case 'dashboard':
                //mozliwe ze bedziesz potrzebowal mt_rand jesli ci nie dziala (tak jak ostatnio)
                echo '<script src="' . $path . 'js/streaming.js?' . mt_rand() . '"></script>';
                echo '<script src="' . $path . 'js/resolutionFormatter.js"></script>';
                echo '<script src="' . $path . 'js/nipple.js"></script>';
                //echo '<script src="' . $path . 'js/controls/primary/joystick.js"></script>';
                //echo '<script src="' . $path . 'js/controls/primary/gamepad.js"></script>';
                //echo '<script src="' . $path . 'js/controls/primary/keyboard.js"></script>';
                //echo '<script src="' . $path . 'js/controls/alternative/joystick.js"></script>';
                echo '<script src="' . $path . 'js/controls/alternative/gamepad.js"></script>';
                //echo '<script src="' . $path . 'js/controls/alternative/keyboard.js"></script>';
                break;
            case 'login':
                echo '<script src="' . $path . 'js/login.js?' . mt_rand() . '"></script>';
                break;
            case 'orientation':
                echo '<script src="' . $path . 'js/three.min.js"></script>';
                echo '<script src="' . $path . 'js/orientation.js?' . mt_rand() . '"></script>';
                break;
            case 'settings':
                //include script for settings fuckery
                break;
        }
    ?>
</body>
</html>