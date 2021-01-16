<div id="outer-container" class="outer-container">
    <div id="top-nav" class="top-nav">
        <a href="<?= $path ?>dashboard">
            <button id="logout" class="btn button-nav">
                <img id="settings-icon" class="nav-icon" src="<?= $path ?>img/double-chevron.png">
                    <h1 class="header-nav">Ustawienia</h1>
                </img>
            </button>
        </a>
    </div>
    <div id="credits-body" class="credits-body">
        <p class="option-half">
            <span class="left-part">
                Status:
            </span>
            <span class="right-part">
                ONLINE/WYSTĄPIŁ PROBLEM/OFFLINE
            </span>
        </p>
        <p class="option-half">
            <span class="left-part">
                Poziom baterii:
            </span>
            <span id="battery-level" class="right-part">
                50%
            </span>
        </p>
        <p class="option-full">
            <span>
                Adres IP urządzenia: (edit)
            </span>
            <input type="text" class="form-control" id="adresIP" placeholder="192.127.0.1">
            </input>
        </p>
        <p class="option-full">
            <span>
                Rozdzielczość obrazu: (edit)
            </span>
            <select class="form-control" id="resolution">
                <option>wartość 1</option>
                <option>wartość 2</option>
                <option>wartość 3</option>
                <option>wartość 4</option>
            </select>
        </p>
        <p class="option-full">
            <span>
                Rozdzielczość zdjęcia:
            </span>
            <select class="form-control" id="resolution">
                <option>wartość 1</option>
                <option>wartość 2</option>
                <option>wartość 3</option>
                <option>wartość 4</option>
            </select>
        </p>
        <p class="option-half">
            <span class="left-part">
                Wybór sterowania:
            </span>
            <span>
                <select class="form-control" id="inputType">
                    <option>Joystick ekranowy</option>
                    <option>Joystick/pad zewnętrzny</option>
                    <option>Klawiatura</option>
                </select>
            </span>
        </p>
        <p class="option-half">
            <span class="left-part">
                Radar:
            </span>
            <span class="form-check-inline">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="optradio">
                        ON/WŁ
                    </input>
                </label>
            </span>
            <span class="form-check-inline">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="optradio">
                        OFF/WYŁ
                    </input>
                </label>
            </span>
        </p>
        <p class="option-half">
            <span class="left-part">
                Kolor punktów:
            </span>
            <span>
                <select class="form-control" id="resolution">
                    <option>Czerwony</option>
                    <option>Zielony</option>
                    <option>Niebieski</option>
                    <option>Żółty</option>
                </select>
            </span>
        </p>
        <p class="option-half">
            <span class="left-part">
                Częstotliwość odświerzania akcelerometru:
            </span>
                <input type="text" class="form-control" id="accelerometerFPS" placeholder="15">
                </input>
        </p>
        <p class="option-half">
            <span class="left-part">
                Wykorzystanie CPU:
            </span>
            <span id="cpuUsage" class="right-part">
                102%
            </span>
        </p>
        <p class="option-half">
            <span class="left-part">
                Liczba wykonanych zdjęć:
            </span>
            <span id="photosTaken" class="right-part">
                miljon
            </span>
        </p>
        <p class="option-half">
            <span class="left-part">
                Przejechany dystans:
            </span>
            <span id="" class="right-part">
            (szacowane)
            </span>
        </p>  
        <p class="option-half">
            <span class="left-part">
                Data ostatniego logowania (obecne konto):
            </span>
            <span id="lastLoginThisAcc" class="right-part">
            1969-13-32-11-60-61
            </span>
        </p>
        <p class="option-half">
            <span class="left-part">
                Data ostatniego logowania (ogółem):
            </span>
            <span id="lastLoginAny" class="right-part">
            jutro
            </span>
        </p>
        <p class="option-half">
            <span id="lastLoginAccount" class="left-part">
                Konto ostatniego logowania:
            </span>
            <span class="right-part">
                nie istnieje
            </span>
        </p>
        <p class="option-half">
            <span class="left-part">
                Ilość logowań z obecnego konta:
            </span>
            <span class="right-part">
            1235
            </span>
        </p>
        <p class="option-half">
            <span class="left-part">
                Ilość logowań ogółem:
            </span>
            <span class="right-part">
            1235
            </span>
        </p>      
        <p class="option-half">
            <span class="left-part">
                Data utworzenia projektu:
            </span>
            <span id="dateCreated" class="right-part">
            2020-13-10-20-07-00
            </span>
        </p>
        <p class="option-half">
            <span class="left-part">
                Czas zalogowania:
            </span>
            <span id="timeRunning" class="right-part">
            3h 50 min
            </span>
        </p>
        </p>
    </div>
</div>