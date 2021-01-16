/*
    Primary version
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

var previousPHPPost = Date.now();       //timestamp for php sending
var timeThreshold = parseInt(100);      //how many ms is supposed to elapse between calls

//on movement (also triggered on click, which is not a desirable effect)
joystick.on('move start', function (evt, data) {
    /*
    what can happen is that straight after clicking, the data passed is undefined (because it's not moved yet)
    so the whole thing crashes, which is the reason for the lines below:
    */
    //because of start event, we have to use this (start return undefined, move contains angles)
    if (data.angle === undefined) {
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
    var x = Math.cos(joyAngleRad);

    //y is the difference between forward/backward
    var y = Math.sin(joyAngleRad);

    ////processing the directions
    //y:
    leftEngineDirection = "forward";
    rightEngineDirection = "forward";
    if (y != 0) {
        if (y < 0) {
            //this can be changed to include different modes for engines should the need arise, for now, one mode
            leftEngineDirection = "backward";
            rightEngineDirection = "backward";
        }
    }


    //x:
    //if x = 0 then skip, we go straight on
    if (x != 0) {
        if (x > 0) {
            //x is in the right side so we brake the right track, floor to get rid of decimals
            leftEnginePower = Math.floor(power * (1 - x));
            rightEnginePower = Math.floor(power);
        } else {
            // x is in the left side so we brake the left track, floor to get rid of decimals, + not - because x changes sign
            leftEnginePower = Math.floor(power);
            rightEnginePower = Math.floor(power * (1 + x));
        }
    }

    //if we're going back, then we have to swap the values of right and left engine (for convenience sake)
    if (leftEngineDirection == "backwards") {
        var tmp = leftEnginePower;
        //console.log("Going backwards, swapping powers")
        leftEnginePower = rightEnginePower;
        rightEnginePower = tmp;
    }
    /*
        //debug:
        console.log("moved");
        console.log("directions: " + leftEngineDirection + "/" + rightEngineDirection);
        console.log("left/right power: " + leftEnginePower + "/" + rightEnginePower);
    */
    if (Date.now() - timeThreshold > previousPHPPost) {
        //if 100ms has elapsed since last post, then you can post again
        sendDataToPHP(leftEngineDirection, leftEnginePower, rightEngineDirection, rightEnginePower);
        previousPHPPost = Date.now();
    }
});

//on movement stop (so the tank doesn't go further)
joystick.on('end', function (evt, data) {
    //when you release the trigger, send a request to stop
    leftEnginePower = 0;
    rightEnginePower = 0;
    /*
        //debug:
        console.log("released joystick");
        console.log("directions: " + leftEngineDirection + "/" + rightEngineDirection);
        console.log("left/right power: " + leftEnginePower + "/" + rightEnginePower);
    */
    if (Date.now() - timeThreshold > previousPHPPost) {
        //if 100ms has elapsed since last post, then you can post again
        sendDataToPHP(leftEngineDirection, leftEnginePower, rightEngineDirection, rightEnginePower);
        previousPHPPost = Date.now();
    }
});

//function sending data to php
function sendDataToPHP(argLeftDirection, argLefPower, argRightDirection, argRightPower) {
    sendRequest(
        'GET', path + 'php/movement.php',
        'rightEngineDirection=' + argRightDirection +
        '&leftEngineDirection=' + argLeftDirection +
        '&leftEnginePower=' + argLefPower +
        '&rightEnginePower=' + argRightPower);
    //debug:
    /*
        console.log("sent request: " + 'GET', path + 'php/control.php',
        'rightEngineDirection=' + { argRightDirection } +
        '&leftEngineDirection=' + { argLeftDirection } +
        '&leftEnginePower=' + { argLefPower } +
        '&rightEnginePower=' + { argRightPower });
    */
};

