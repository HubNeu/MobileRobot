
        <div class="login">
            <div class="login-container">
                <div class="container-body">
                    <div class="logo">
                        <img src="<?= $path ?>img/diploma-icon.png" style="width: 100%; height: auto">
                    </div>
                    <form action="connection/database/query/login.php" class="form-signin" method="post">
                        <div class="login-row">
                            <input type="text" name="login" placeholder="Login" class="k-form-control <?php if (isset($_SESSION['error']) && ($_SESSION['error'] == 'EmptyLoginPassword' || $_SESSION['error'] == 'EmptyLogin')) echo 'is-invalid'; ?>" value="<?php if (isset($_SESSION['rememberLogin'])) echo $_SESSION['rememberLogin']; ?>" <?php if (!isset($_SESSION['rememberLogin'])) echo 'autofocus'; ?> required>
                            <?php
                                if (isset($_SESSION['error']) && ($_SESSION['error'] == 'EmptyLoginPassword' || $_SESSION['error'] == 'EmptyLogin'))
                                    echo '<span class="k-row-field-error">Uzupełnij pole</span>';
                            ?>
                        </div>
                        <div class="login-row">
                            <input type="password" name="password" placeholder="Hasło" class="k-form-control <?php if (isset($_SESSION['error']) && ($_SESSION['error'] == 'EmptyLoginPassword' || $_SESSION['error'] == 'EmptyPassword')) echo 'is-invalid'; ?>" <?php if (isset($_SESSION['rememberLogin'])) {
                                                                                                                                                                                                                                                                            unset($_SESSION['rememberLogin']);
                                                                                                                                                                                                                                                                            echo 'autofocus';                                                                                                                                                                                                                                   } ?> required>
                            <?php
                                if (isset($_SESSION['error']) && ($_SESSION['error'] == 'EmptyLoginPassword' || $_SESSION['error'] == 'EmptyPassword'))
                                    echo '<span class="k-row-field-error">Uzupełnij pole</span>';
                                else if (isset($_SESSION['error']) && $_SESSION['error'] == 'IncorrectLoginPassword')
                                    echo '<span class="k-row-field-error">Nieprawidłowy login lub hasło</span>';
                            ?>
                        </div>
                        <div class="login-row">
                            <button type="submit" role="button" class="k-btn k-btn-fluid ">Zaloguj się</button>
                        </div>
                        <div class="login-row" style="text-align: right">
                            <a href="sub/reminder.php" class="link">Nie pamiętasz hasła?</a>
                        </div>
                    </form>
                </div>
                <div class="container-footer">
                    <span>W celu utworzenia konta, skontaktuj się z administracją serwisu.</span>
                </div>
            </div>
        </div>