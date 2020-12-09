
        <div class="login">
            <div class="login-container">
                <div class="container-body">
                    <div class="logo">
                        <img src="<?= $path ?>img/diploma-icon.png" style="width: 100%; height: auto">
                    </div>
                    <form id="form" class="form-signin">
                        <div class="login-row">
                            <input type="text" id="login" placeholder="Login" class="k-form-control" onkeyup="fillInLogin()" autofocus required>
                            <span id="msgLogin" class="k-row-field-error"></span>
                        </div>
                        <div class="login-row">
                            <input type="password" id="password" placeholder="Hasło" class="k-form-control" onkeyup="fillInPassword()" required>
                            <span id="msgPassword" class="k-row-field-error"></span>
                        </div>
                        <div class="login-row">
                            <button class="k-btn k-btn-fluid" onclick="signIn()">Zaloguj się</button>
                        </div>
                    </form>
                </div>
                <div class="container-footer">
                    <span>W celu utworzenia konta, zresetowania danych logowania, bądź uzyskania innych informacji skontaktuj się z <a href="mailto: oskar.zborowski@student.put.poznan.pl">administracją</a> serwisu</span>
                </div>
            </div>
        </div>