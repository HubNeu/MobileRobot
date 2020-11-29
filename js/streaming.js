const stream = document.getElementById('stream-box');
let state;

const streaming = async () =>
{
    if (state == null)
        state = await sendRequest('GET', path + 'php/processing.php?streaming=state');
    
    if (state)
    {
        let ip = await sendRequest('GET', path + 'php/processing.php?streaming=on');
        stream.src = ip;

        $('#play-stream').prop('disabled', true);
        $('#stop-stream').prop('disabled', false);
    }
    else
    {
        await sendRequest('GET', path + 'php/processing.php?streaming=off');
        stream.src = path + 'img/screensaver-stream-image.jpg';

        $('#stop-stream').prop('disabled', true);
        $('#play-stream').prop('disabled', false);
    }
}

function switch_stream()
{
    state = !state;
    streaming();
}

if (stream != null)
    streaming();