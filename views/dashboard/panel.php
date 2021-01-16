        <div id="outer_div" class="container-fluid">
            <div id="nav" class="nav-container"> <!--  topbar z tytułem i przyciskami wylogowania i menu  -->
                <!-- modal -->
                <div class="modal fade" id="myModal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <!-- modal header -->
                            <div class="modal-header">
                                <h4 class="modal-title">
                                Menu
                                </h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <!-- modal body -->
                            <div class="modal-body">
                                <a href="<?= $path ?>settings">
                                    <button id="logout" class="btn">
                                        <img id="settings-icon" class="modal-entry" src="<?= $path ?>img/pencil.png">
                                            Ustawienia
                                        </img>
                                    </button>
                                </a>
                                <br>
                                <a href="<?= $path ?>credits">
                                    <button id="logout" class="btn">
                                        <img id="settings-icon" class="modal-entry" src="<?= $path ?>img/info.png">
                                            O projekcie
                                        </img>
                                    </button>
                                </a>
                                <br>
                                <a href="<?= $path ?>php/logout.php">
                                    <button id="logout" class="btn" onclick="switch_stream()">
                                        <img id="logout-icon" class="modal-entry" src="<?= $path ?>img/logout-icon.png">
                                            Wyloguj
                                        </img>
                                    </button>
                                </a>
                                <br>
                                <button id="shutdown" onclick="shutdown()" class="btn">
                                    <img id="shutdown-icon" class="modal-entry" src="<?= $path ?>img/shutdown-icon.png">
                                        Wyłącz robota
                                    </img>
                                </button>
                            </div>
                            <!-- modal footer -->
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal">
                                    Zamknij
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <!--
                    the part below is a mess but surprisingly SO thinks that's the way to do it
                -->
                <div id="nav-container-left" class="nav-left"> <!--  ikona oraz napis mobile robot z lewej  -->
                    <img class="nav-project-icon-left" src="<?= $path ?>img/tank-icon.png">
                    <h1 id="title">Mobile Robot</h1>
                </div>
                <div id="nav-container-right" class="nav-right"> <!--  przyciski logowania i menu z prawej  -->                    
                    <button id="play-stream" class="btn nav-stream" onclick="switch_stream()" disabled><img class="nav-stream-icon" src="<?= $path ?>img/play-icon.png"></button>
                    <button id="stop-stream" class="btn nav-stream" onclick="switch_stream()" disabled><img class="nav-stream-icon" src="<?= $path ?>img/stop-icon.png"></button>
                    <button id="menu-button" class="btn" data-toggle="modal" data-target="#myModal"><img id="menu-button-icon" class="nav-project-icon" src="<?= $path ?>img/menu.png"></img>Menu</button>
                </div>
            </div>
            <div id="main" class="stream-outer-container"> <!--  main contains stream screen and right side panel  -->
                <!--    main panel -->
                <div id="stream" class="stream-container">
                    <div id="stream-div" class="stream-background">
                        <img id="stream-box" class="image" src="<?= $path ?>img/screensaver-image.jpg"></img>
                    </div>
                </div>
                <!--    right panel   -->
                <div id="stream-panel" class="stream-panel">
                    <div id="env-map" class="env-map-field">
                    </div>
                    <button class="btn btn-outline-dark stream-nav-button">Obrót wierzy</button>
                    <br>
                    <button class="btn btn-outline-dark stream-nav-button">Reset pozycji</button>
                    <div id="nipple" class="nipple-field">
                    
                    </div>
                </div>
            </div>
        </div>