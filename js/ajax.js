const stream = document.getElementById('stream-box');
let state;

async function sendRequest(method, url)
{
    return new Promise(function (resolve, reject)
    {
        let xhr = new XMLHttpRequest();

        xhr.open(method, url);

        xhr.onload = function ()
        {
            if (this.status >= 200 && this.status < 300)
                resolve(xhr.response);
            else
            {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };

        xhr.onerror = function ()
        {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };

        xhr.send();
    });
}

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
        stream.src = path + 'img/screensaver-stream.jpg';

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