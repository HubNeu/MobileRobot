/*
    Primary version
*/

var gp;
var inputMethodGamepad = true; //make a php request from database or from session
var gamepadConnected = false;
var alternativeMode = false;                //alternative mode where you have one joystick for movement and one for camera, changed from the settings
var numberOfIterations = parseFloat(60);  //number of iterations per second that you want, we have a limit on how much, for testing purposes = 1
var gamepadRefreshRate = parseFloat(1000 / numberOfIterations); //1000 because we use ms not s
var intervalID;

var leftHorizontal = parseFloat(0.0);       //for steering left right
var leftVertical = parseFloat(0.0);         //aleternative mode: forward backward
var rightHorizontal = parseFloat(0.0);      //forward backward, alternative: camera left right
var rightVertical = parseFloat(0.0);        //alternative: camera leftRight

var leftEngineDirection = "forward";
var rightEngineDirection = "forward";
var leftEnginePower = parseInt(0);
var rightEnginePower = parseInt(0);

var previousValueLeftEngineDirection = leftEngineDirection;
var previousValueRightEngineDirection = rightEngineDirection;
var previousLeftEnginePower = leftEnginePower;
var previousRightEnginePower = rightEnginePower;

//var previousButtonState = false;            //previous button state for push detection

//init: check input method type
$(document).ready(function () {
    //check input type for gamepad
    if (inputMethodGamepad) {
        $(window).on("gamepadconnected", function () {
            gp = navigator.getGamepads()[0];
            //console.log("/////////////////////////////////////");
            console.log(gp);
            //console.log("/////////////////////////////////////");
            inputMethodGamepad = true;
            gamepadConnected = true;
            //console.log("test");
            initGampepad();
        });
    }
});

//when it disappears
$(window).on("gamepaddisconnected", function () {
    gamepadConnected = false;
    inputMethodGamepad = false;
    gp = null;
});

function initGampepad() {
    intervalID = setInterval(summingFunction, gamepadRefreshRate);
}

function summingFunction() {
    //functions with no parameters, DO NOT put any local variables here
    //this will catch any function fires after disconnecting the gamepad
    var enableMonsterIF = false;
    try {
        mainCalculatingfunction();
        if (enableMonsterIF) { //monster IF
            if ((previousValueLeftEngineDirection == leftEngineDirection) && (previousValueRightEngineDirection == rightEngineDirection) && (previousLeftEnginePower == leftEnginePower) & (previousRightEnginePower == rightEnginePower)) {
                //sendDataToPHP(leftEngineDirection, leftEnginePower, rightEngineDirection, rightEnginePower);
            }
        } else {
            //sendDataToPHP(leftEngineDirection, leftEnginePower, rightEngineDirection, rightEnginePower);
        }
    } catch (error) {
        console.log("Timeout fired after disconnecting the gamepad or some other error.");
        console.log("Disconnect and reconnect the pad or reload the page.");
        console.log("Error details:");
        console.log(error);
        clearInterval(intervalID);
        //just to be safe
        gamepadConnected = false;
        inputMethodGamepad = false;
        gp = null;
    }
}

function mainCalculatingfunction() {
    //"normal" mode
    console.log(alternativeMode);
    var rv = gp.axes[3];
    var lh = gp.axes[0];
    if (Math.abs(rv) <= 0.15) {
        //deadzone size = <-0.15,0.15>
        rv = 0;
    }
    if (Math.abs(lh) <= 0.15) {
        //deadzone size = <-0.15,0.15>
        lh = 0;
    }
    rightVertical = 255 * rv;     //forwards backwards times scaling factor to 255
    leftHorizontal = 255 * lh;    //left right, also with 
    //console.log("----------------------------------")
    //console.log("right vert: " + rightVertical + " lefthoriz: " + leftHorizontal);
    //console.log("left horiz: " + leftHorizontal);

    //values helping to divide left and right motions of the left joystick
    var left = 0;
    var right = 0;
    //if joystick is tilted left
    if (leftHorizontal < 0) {
        //assign the value from the reading to the left variable, 0 to the right variable
        left = leftHorizontal;
        right = 0;
    } else {
        //and the otherway around if it's not the case
        left = 0;
        right = leftHorizontal;
    }

    if (rightVertical > 0) {
        leftEngineDirection = rightEngineDirection = "backward";
    } else {
        leftEngineDirection = rightEngineDirection = "forward";
    }
    //the left and right values is how much we're braking each track (left -> left track, right -> right track)
    if (leftEngineDirection == "forward") {
        //if engine goes forward
        leftEnginePower = Math.abs(rightVertical) + left;
        rightEnginePower = Math.abs(rightVertical) - right;
    } else {
        //if engine goes backward we want to swap left and right values to preserve the behaviour of the vehicle
        leftEnginePower = Math.abs(rightVertical) + left;
        rightEnginePower = Math.abs(rightVertical) - right;
    }
    //console.log("leftEnginePower: " + leftEnginePower + " rightEnginePower: " + rightEnginePower);
}

//function sending data to php
function sendDataToPHP(argLeftDirection, argLefPower, argRightDirection, argRightPower) {
    sendRequest(
        'GET', path + 'php/movement.php',
        'rightEngineDirection=' + argRightDirection +
        '&leftEngineDirection=' + argLeftDirection +
        '&leftEnginePower=' + argLefPower +
        '&rightEnginePower=' + argRightPower);
    /*
        //debug:
        console.log("sent request: " + 'GET', path + 'php/control.php',
        'rightEngineDirection=' + { argRightDirection } +
        '&leftEngineDirection=' + { argLeftDirection } +
        '&leftEnginePower=' + { argLefPower } +
        '&rightEnginePower=' + { argRightPower });
    */
};

function myAbsolute(argValue) {
    //custom absolute value function,
    //returns value if value > 0, or 0 if value < 0
    if (argValue < 0) {
        return argValue;
    } else {
        return parseInt(0);
    }

}