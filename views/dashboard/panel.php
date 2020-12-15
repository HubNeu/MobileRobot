
        <div id="nav">
            <a href="<?= $path ?>php/logout.php"><button id="logout" onclick="switch_stream()"><img id="logout-icon" class="nav-icon" src="<?= $path ?>img/logout-icon.png"></button></a>
            <button id="shutdown" onclick="shutdown()"><img id="shutdown-icon" class="nav-icon" src="<?= $path ?>img/shutdown-icon.png"></button>
        </div>
        <div id="main">
            <div id="stream">
                <img id="stream-box" src="<?= $path ?>img/screensaver-image.jpg">
                <div id="stream-nav">
                    <button id="play-stream" class="nav-stream" onclick="switch_stream()" disabled><img class="nav-stream-icon" src="<?= $path ?>img/play-icon.png"></button>
                    <button id="stop-stream" class="nav-stream" onclick="switch_stream()" disabled><img class="nav-stream-icon" src="<?= $path ?>img/stop-icon.png"></button>
                </div>
            </div>
            <div id="text">
                <pre><?= $this->body['text'] ?></pre>
            </div>
        </div>