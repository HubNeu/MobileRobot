    </div>
    <script src="<?= $path ?>js/jquery.min.js"></script>
	<script src="<?= $path ?>js/bootstrap.bundle.min.js"></script>
    <script src="<?= $path ?>js/ajax.js"></script>
    <?php
        switch ($this->controller)
        {
            case 'dashboard':
                echo '<script>let path = "' . $path . '";</script>';
                echo '<script src="' . $path . 'js/streaming.js?' . mt_rand() . '"></script>';
                break;
        }
    ?>
</body>
</html>