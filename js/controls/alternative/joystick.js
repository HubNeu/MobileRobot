/*
    Alternative version
*/

// joystick setup (dynamic)
var options = {
    zone: document.getElementById('nipple'),
    mode: 'dynamic',
    restOpacity: 0.6
};
//creating the joystick
var joystick = nipplejs.create(options);

//variables for data processing
var leftEngineDirection = "forward";    //forward or backward
var rightEngineDirection = "forward";
var leftEnginePower = parseInt(0);                //power expected between 0 and 255
var rightEnginePower = parseInt(0);
var scalingFactor = parseFloat(5.1);    //scaling factor, joystick gives range of 0 to 50, hence 255/50 = 5.1

var previousPost = Date.now();       //timestamp for php sending
var timeThreshold = parseInt(100);      //how many ms is supposed to elapse between calls

//on movement (also triggered on click, which is not a desirable effect)
joystick.on('move start', function (evt, data) {
    /*
    what can happen is that straight after clicking, the data passed is undefined (because it's not moved yet)
    so the whole thing crashes, which is the reason for the lines below:
    */
    //because of start event, we have to use this (start return undefined, move contains angles)
    if (data.angle === undefined || data.direction === undefined) {
        //console.log("value is undefined: " + data.angle + " and so we're skipping this turn");
        return;
    }
    //all the data we need
    var power = data.distance * scalingFactor;

    //var joyAngle = data.angle;

    //once we have good data, get radians for further processing
    var joyAngleRad = data.angle.radian;

    //debug:
    //console.log(powerCombined);
    //console.log("joyAngleRad: " + joyAngleRad + " rad");

    /*
    process that data into what we need:
    leftEngineDirection  = forward/backward
    rightEngineDirection = forward/backward
    leftEnginePower = 0 to 255
    rightEnginePower = 0 to 255
    */

    //basic geometry, draw a xy plane, choose a point and calculate it's x and y values

    //x is the difference in speed between wheels for directions
    var x = Math.cos(2 * joyAngleRad);

    //y is the difference between forward/backward
    //var y = Math.sin(2 * joyAngleRad);    //commented out as it's not used here


    switch (data.direction.angle) {
        case "up":
            if (data.direction.x == "right") {
                //up and to the right
                //left engine max power
                //right gradually going down to zero
                leftEngineDirection = "forward";
                rightEngineDirection = "forward";
                leftEnginePower = power;
                rightEnginePower = -power * x;
            } else {
                //up and to the left
                //right engine max power
                //left gradually down
                leftEngineDirection = "forward";
                rightEngineDirection = "forward";
                leftEnginePower = -power * x;
                rightEnginePower = power;
            }
            break;
        case "down":
            if (data.direction.x == "right") {
                //down and to the right
                leftEngineDirection = "backward";
                rightEngineDirection = "backward";
                leftEnginePower = power;
                rightEnginePower = -power * x;
            } else {
                //up and to the left
                //right engine max power
                //left gradually down
                leftEngineDirection = "backward";
                rightEngineDirection = "backward";
                leftEnginePower = -power * x;
                rightEnginePower = power;
            }
            break;
        case "left":
            if (data.direction.y == "up") {
                //IInd quater bottom part
                leftEngineDirection = "backward";
                rightEngineDirection = "forward";
                leftEnginePower = power * x;
                rightEnginePower = power;
            } else {
                //IIIrd quater upper part
                leftEngineDirection = "forward";
                rightEngineDirection = "backward";
                leftEnginePower = power;
                rightEnginePower = -power * x;
            }
            break;
        case "right":
            if (data.direction.y == "up") {
                leftEngineDirection = "forward";
                rightEngineDirection = "backward";
                leftEnginePower = power;
                rightEnginePower = power * x;
            } else {
                leftEngineDirection = "backward";
                rightEngineDirection = "forward";
                leftEnginePower = power * x;
                rightEnginePower = power;
            }
            break;
        default:
            console.log("error calculating directions: joystick outside of plane");
            leftEnginePower = 0;
            rightEnginePower = 0;
            break;
    }

    //console.log("angle: " + data.angle.degree);
    //console.log("LD: " + leftEngineDirection + " LP: " + leftEnginePower);
    //console.log("RD: " + rightEngineDirection + " RP " + rightEnginePower);
    /*
        //debug:
        console.log("moved");
        console.log("directions: " + leftEngineDirection + "/" + rightEngineDirection);
        console.log("left/right power: " + leftEnginePower + "/" + rightEnginePower);
    */
    if (Date.now() - timeThreshold > previousPost) {
        //if 100ms has elapsed since last post, then you can post again
        sendDataToPHP(leftEngineDirection, leftEnginePower, rightEngineDirection, rightEnginePower);
        previousPost = Date.now();
    }
});

//on movement stop (so the tank doesn't go further)
joystick.on('end', function (evt, data) {
    //when you release the trigger, send a request to stop
    leftEnginePower = 0;
    rightEnginePower = 0;
    //this has to execute every time it's called to stop the robot
    sendDataToPHP(leftEngineDirection, leftEnginePower, rightEngineDirection, rightEnginePower);
    /*
        //debug:
        console.log("released joystick");
        console.log("directions: " + leftEngineDirection + "/" + rightEngineDirection);
        console.log("left/right power: " + leftEnginePower + "/" + rightEnginePower);
    
    if (Date.now() - timeThreshold > previousPost) {
        //if 100ms has elapsed since last post, then you can post again
        sendDataToPHP(leftEngineDirection, leftEnginePower, rightEngineDirection, rightEnginePower);
        previousPost = Date.now();
    }
    */
});

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

