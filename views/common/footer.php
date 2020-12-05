    </div>
    <?php
        switch ($this->controller)
        {
            case 'dashboard':
                echo '<script src="' . $path . 'js/streaming.js?' . mt_rand() . '"></script>';
                break;
        }
    ?>
</body>
</html>