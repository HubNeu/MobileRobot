/*
    Alternative version
*/

var gp;
var inputMethodGamepad = true; //make a php request from database or from session
var gamepadConnected = false;
var numberOfIterations = parseFloat(20);  //number of iterations per second that you want, we have a limit on how much, for testing purposes = 1
var gamepadRefreshRate = parseFloat(1000 / numberOfIterations); //1000 because we use ms not s
var intervalID;
var modifier = 255;         //modifier for scaling joystick input

var leftHorizontalSpeed = parseFloat(0.0);       //for steering left right
var leftVertical = parseFloat(0.0);         //aleternative mode: forward backward
var rightHorizontal = parseFloat(0.0);      //forward backward, alternative: camera left right
var rightVerticalSpeed = parseFloat(0.0);        //alternative: camera leftRight

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
    try {
        mainCalculatingfunction();
        if ((previousValueLeftEngineDirection == leftEngineDirection) &&
            (previousValueRightEngineDirection == rightEngineDirection) &&
            (previousLeftEnginePower == leftEnginePower) &&
            (previousRightEnginePower == rightEnginePower)) {
            //values are the same, so do nothing
            console.log("-----------NOT SENT-----------")
        } else {
            //values are different
            //sendDataToPHP(leftEngineDirection, leftEnginePower, rightEngineDirection, rightEnginePower);
            console.log("-----------SENT-----------")
        }
        previousValueLeftEngineDirection = leftEngineDirection;
        previousValueRightEngineDirection = rightEngineDirection;
        previousLeftEnginePower = leftEnginePower;
        previousRightEnginePower = rightEnginePower;
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
    var rv = gp.axes[3];    //-1 to the left, 1 to the right
    var lh = gp.axes[0];    //-1 if up, 1 if down
    //console.log("rv: " + rv);
    //console.log("lh: " + lh);
    if (Math.abs(rv) <= 0.15) {
        //deadzone size = <-0.15,0.15>
        rv = 0;
    }
    if (Math.abs(lh) <= 0.15) {
        //deadzone size = <-0.15,0.15>
        lh = 0;
    }
    //console.log("rv after: " + rv);
    //console.log("lh after: " + lh);
    rightVerticalSpeed = Math.abs(modifier * rv);     //forwards backwards times scaling modifier to 255
    leftHorizontalSpeed = Math.abs(modifier * lh);    //left right, also with 
    //console.log("----------------------------------");
    //console.log("rightVerticalPos after2: " + rightVerticalSpeed);
    //console.log("leftHorizontalPos after2: " + leftHorizontalSpeed);
    //console.log("right vert: " + rightVerticalPos + " lefthoriz: " + leftHorizontalPos);
    //console.log("left horiz: " + leftHorizontal);

    //modifier is the forward speed we input
    if (lh == 0) {
        //straight
        if (rv <= 0) {
            //straight forward
            leftEngineDirection = "forward";
            rightEngineDirection = "forward";
            rightEnginePower = rightVerticalSpeed;
            leftEnginePower = rightVerticalSpeed;
        } else {
            //straight backward
            leftEngineDirection = "backward";
            rightEngineDirection = "backward";
            rightEnginePower = rightVerticalSpeed;
            leftEnginePower = rightVerticalSpeed;
        }
    } else {
        //going to turn
        if (lh < 0) {
            //if we're going left
            if (lh < -0.5) {
                //if it's beyond 50% left, we are turning hard
                leftEngineDirection = "backward";
                rightEngineDirection = "forward";
                rightEnginePower = rightVerticalSpeed;
                leftEnginePower = rightVerticalSpeed * 2 * Math.abs(lh) - 255;
                console.log("rightVerticalSpeed: " + rightVerticalSpeed + " leftHorizontalSpeed: " + leftHorizontalSpeed + " mult: " + leftEnginePower);
            } else {
                //if not it's a slower turn
                leftEngineDirection = "forward";
                rightEngineDirection = "forward";
                //see what works
                leftEnginePower = rightVerticalSpeed * (1 - 2 * Math.abs(lh));
                //leftEnginePower = (modifier * leftHorizontalPos) >= 0 ? modifier - leftHorizontalPos : 0;
                rightEnginePower = rightVerticalSpeed;
                console.log("rightVerticalSpeed: " + rightVerticalSpeed + " leftHorizontalSpeed: " + leftHorizontalSpeed + " mult: " + leftEnginePower);
            }
        } else {
            if (lh > 0.5) {
                //max right, max turn
                leftEngineDirection = "forward";
                rightEngineDirection = "backward";
                leftEnginePower = rightVerticalSpeed;
                rightEnginePower = rightVerticalSpeed * 2 * Math.abs(lh) - 255;
                console.log("rightVerticalSpeed: " + rightVerticalSpeed + " leftHorizontalSpeed: " + leftHorizontalSpeed + " mult: " + leftEnginePower);
            } else {
                //right slower turn
                leftEngineDirection = "forward";
                rightEngineDirection = "forward";
                //see what works
                rightEnginePower = rightVerticalSpeed * (1 - 2 * Math.abs(lh));
                //leftEnginePower = (modifier * (1 - 2 * leftHorizontalPos)) >= 0 ? modifier * (1 - 2 * leftHorizontalPos) : 0;
                //leftEnginePower = (modifier * leftHorizontalPos) >= 0 ? modifier - leftHorizontalPos : 0;
                leftEnginePower = rightVerticalSpeed;
                console.log("rightVerticalSpeed: " + rightVerticalSpeed + " leftHorizontalSpeed: " + leftHorizontalSpeed + " mult: " + leftEnginePower);
            }
        }
        if (rv > 0) {
            //if we're going backwards we want to swap directions of rotations
            if (Math.abs(lh) > 0.5) {
                //<-1,-.5)U(0.5,1> we want to just swap directions
                var tmp = leftEngineDirection;
                leftEngineDirection = rightEngineDirection;
                rightEngineDirection = tmp;
            } else {
                //<-0.5,0.5> we want to swap values AND negate directions (both engines go forward prior)
                var tmp = leftEnginePower;
                leftEnginePower = rightEnginePower;
                rightEnginePower = tmp;
                leftEngineDirection = rightEngineDirection = "backward";
            }
        }
    }
    console.log("leftEngineDirection: " + leftEngineDirection + " leftEnginePower: " + leftEnginePower);
    console.log("rightEngineDirection: " + rightEngineDirection + " rightEnginePower: " + rightEnginePower);
}

$(document).ready(console.log("ready from alt gamepad"));

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

/*
//keeping for future purposes
function mainCalculatingfunction() {
    if (alternativeMode) {
        //alternative mode, there's no place to send the variables atm
        var lh = gp.axes[0];
        var lv = gp.axes[1];
        var rh = gp.axes[2];
        var rv = gp.axes[3];
        if (Math.abs(lh) <= 0.15) {
            //deadzone size = <-0.15,0.15>
            lh = 0;
        }
        if (Math.abs(lv) <= 0.15) {
            //deadzone size = <-0.15,0.15>
            lv = 0;
        }
        if (Math.abs(rh) <= 0.15) {
            //deadzone size = <-0.15,0.15>
            rh = 0;
        }
        if (Math.abs(rv) <= 0.15) {
            //deadzone size = <-0.15,0.15>
            rv = 0;
        }
        leftHorizontal = 255 * lh;    //left right tank
        leftVertical = 255 * lv;      //forward backward tank
        rightHorizontal = 255 * rh;   //left right camera
        rightVertical = 255 * rv;     //up down camera


        //console.log("lh: " + leftHorizontal + " lv: " + leftVertical + " rh: " + rightHorizontal + " rv: " + rightVertical);

        //calculate values to be sent to engine
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
    } else {
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
}
*/