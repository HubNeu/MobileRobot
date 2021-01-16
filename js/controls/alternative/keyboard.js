/*
    Alternative version
*/

var keyboardInputMethod = true;
var firstStroke = true;
var lastTimeOfTransmission = Date.now();

var keys = [];
var previousKeys = [];
var keysInput = {};
var leftEngineDirection = "forward";    //forward or backward
var rightEngineDirection = "forward";
var leftEnginePower = 0;                //power expected between 0 and 150
var rightEnginePower = 0;
var connectionInterval = 100;           //how much ms is supposed to elapse between sending

var defaultTurnSlowerEngineSpeed = 50;  //value with which the slower engine will turn when go
var defaultEngineSpeed = 150;           //default value for going forward and outer engine when turning

/*
    How this mechanism works:
    -keydown lsitens for all keys down, then processes them to an array of key values
     which can be processed into output which is sent (and remembered) to php
    -if a keyup event is toggled, it deletes that value from the list of pressed keys and
     those are processed and passed to php as well. It also means that keydown event stops toggling alltogether.
     But because we remember the last input, it will behave just like it should. Nasty piece of code.
     this can be remade using a loop just like gamepad.js
*/

//event listener for keypresses
$(document).keydown(function (event) {
    //console.log("keydown detected");
    //this event fires multiple times a second
    keysInput[event.which] = true;
    keys = Object.entries(keysInput).map((e) => (e[0]));
    //console.log(keys);
    if (!(keys.equals(previousKeys))) {
        //debug:
        //console.log("arrays aren't same: ");
        //console.log(keys);
        //console.log(previousKeys);

        //if keys are different tan detected last time we do calculations
        //we delegate that to other function for convenience
        calculateEngineParameters(keys);
        if (Date.now() - lastTimeOfTransmission > connectionInterval) {
            //sendToPHP();
        }
    } else {
        //console.log("arrays are same: ");
        //console.log(keys);
        //console.log(previousKeys);
    }
    //assign old array the values of new array (by value, not reference)
    previousKeys = keys;
    keys = new Array(0);
    //console.log("keydown detected end");
});

$(document).keyup(function (event) {
    //console.log(keys);
    //console.log("keyup detected");
    //this line deletes released key from the list of keys pressed. The loop caused by pressing the buttons will continue as usual
    delete keysInput[event.which];
    //console.log("deleted: " + event.which);
    //console.log(keysInput);
    //console.log(keys);

    //calculate engine values
    keys = Object.entries(keysInput).map((e) => (e[0]));
    calculateEngineParameters(keys);
    if (Date.now() - lastTimeOfTransmission > connectionInterval) {
        //sendToPHP();
    }
    previousKeys = keys;
    keys = {};
    //console.log("keyup detected end");
});

function calculateEngineParameters(argKeys) {
    //console.log("calculating parameters");
    //check for W
    var goForward = argKeys.includes("87") ? true : false;
    //S
    var goBackward = argKeys.includes("83") ? true : false;
    //A
    var goLeft = argKeys.includes("65") ? true : false;
    //D
    var goRight = argKeys.includes("68") ? true : false;

    if ((goForward && goBackward) || (goLeft && goRight) || (argKeys.length == 0)) {
        //console.log("-------stop-------");
        //case where we stand still
        leftEnginePower = rightEnginePower = 0;
        //sendToPHP;
        //console.log("values: leftDir: " + leftEngineDirection + " rightDir: " + rightEngineDirection + " leftPower: " + leftEnginePower + " rightPower: " + rightEnginePower);

        return;
    }
    if (goForward && goLeft) {
        //console.log("-------forward and left-------");
        leftEngineDirection = rightEngineDirection = "forward";
        leftEnginePower = 0;
        rightEnginePower = defaultEngineSpeed;
        //sendToPHP;
        //console.log("values: leftDir: " + leftEngineDirection + " rightDir: " + rightEngineDirection + " leftPower: " + leftEnginePower + " rightPower: " + rightEnginePower);

        return;
    }
    if (goForward && goRight) {
        //console.log("-------forward adn right-------");
        leftEngineDirection = rightEngineDirection = "forward";
        leftEnginePower = defaultEngineSpeed;
        rightEnginePower = 0;
        //sendToPHP;
        //console.log("values: leftDir: " + leftEngineDirection + " rightDir: " + rightEngineDirection + " leftPower: " + leftEnginePower + " rightPower: " + rightEnginePower);

        return;
    }
    if (goBackward && goLeft) {
        //console.log("-------backward and left-------");
        leftEngineDirection = rightEngineDirection = "backward";
        leftEnginePower = 0;
        rightEnginePower = defaultEngineSpeed;
        //sendToPHP;
        //console.log("values: leftDir: " + leftEngineDirection + " rightDir: " + rightEngineDirection + " leftPower: " + leftEnginePower + " rightPower: " + rightEnginePower);

        return;
    }
    if (goBackward && goRight) {
        //console.log("-------backward and right-------")
        leftEngineDirection = rightEngineDirection = "backward";
        leftEnginePower = defaultEngineSpeed;
        rightEnginePower = 0;
        //sendToPHP;
        //console.log("values: leftDir: " + leftEngineDirection + " rightDir: " + rightEngineDirection + " leftPower: " + leftEnginePower + " rightPower: " + rightEnginePower);

        return;
    }
    if (goForward) {
        //console.log("-------forward-------");
        leftEngineDirection = rightEngineDirection = "forward";
        leftEnginePower = rightEnginePower = defaultEngineSpeed;
        //sendToPHP;
        //console.log("values: leftDir: " + leftEngineDirection + " rightDir: " + rightEngineDirection + " leftPower: " + leftEnginePower + " rightPower: " + rightEnginePower);

        return;
    }
    if (goBackward) {
        //console.log("-------backward-------");
        leftEngineDirection = rightEngineDirection = "backward";
        leftEnginePower = rightEnginePower = defaultEngineSpeed;
        //sendToPHP;
        //console.log("values: leftDir: " + leftEngineDirection + " rightDir: " + rightEngineDirection + " leftPower: " + leftEnginePower + " rightPower: " + rightEnginePower);

        return;
    }
    if (goLeft) {
        //console.log("-------left-------");
        leftEngineDirection = "background";
        rightEngineDirection = "forward";
        leftEnginePower = rightEnginePower = defaultEngineSpeed;
        //sendToPHP;
        //console.log("values: leftDir: " + leftEngineDirection + " rightDir: " + rightEngineDirection + " leftPower: " + leftEnginePower + " rightPower: " + rightEnginePower);

        return;
    }
    if (goRight) {
        //console.log("-------right-------");
        leftEngineDirection = "forward";
        rightEngineDirection = "backward";
        rightEnginePower = leftEnginePower = defaultEngineSpeed;
        //sendToPHP;
        //console.log("values: leftDir: " + leftEngineDirection + " rightDir: " + rightEngineDirection + " leftPower: " + leftEnginePower + " rightPower: " + rightEnginePower);

        return;
    }
    //console.log("Function fail values: (f/w/l/r)" + goForward + goBackward + goLeft + goRight);
}

//$(window).ready(console.log("Loaded"));

//Custom array.equals() method for comparing arrays
// Warn if overriding existing method
if (Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l = this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", { enumerable: false });

//function sending data to php
function sendDataToPHP(argLeftDirection, argLefPower, argRightDirection, argRightPower) {
    sendRequest(
        'GET', path + 'php/movement.php',
        'rightEngineDirection=' + parseInt(argRightDirection) +
        '&leftEngineDirection=' + parseInt(argLeftDirection) +
        '&leftEnginePower=' + parseInt(argLefPower) +
        '&rightEnginePower=' + parseInt(argRightPower));
    //debug:
    /*
        console.log("sent request: " + 'GET', path + 'php/control.php',
        'rightEngineDirection=' + { argRightDirection } +
        '&leftEngineDirection=' + { argLeftDirection } +
        '&leftEnginePower=' + { argLefPower } +
        '&rightEnginePower=' + { argRightPower });
    */
};
