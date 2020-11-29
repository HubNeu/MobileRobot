<div id="main">
    <div id="stream">
        <img id="stream-box">
        <div id="stream-nav">
            <button id="play-stream" class="nav-stream" onclick="switch_stream()"><img class="icon-nav-stream" src="<?= $path ?>img/play-stream-icon.png"></button>
            <button id="stop-stream" class="nav-stream" onclick="switch_stream()"><img class="icon-nav-stream" src="<?= $path ?>img/stop-stream-icon.png"></button>
        </div>
    </div>
    <div id="message">
        <pre><?= $this->body['message'] ?></pre>
    </div>
</div>