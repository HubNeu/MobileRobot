const image = document.getElementById('image');
let state = false;

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
    if (state)
    {
        await sendRequest('GET', path + 'php/streaming.php?q=on');
        image.src = 'http://192.168.43.95:8081';
    }
    else
    {
        await sendRequest('GET', path + 'php/streaming.php?q=off');
        image.src = path + 'img/politechnika.jpg';
    }
}

function play()
{
    if (!state)
    {
        state = true;
        streaming();

        $('#play').prop('disabled', true);
        $('#stop').prop('disabled', false);
    }
}

function stop()
{
    if (state)
    {
        state = false;
        streaming();

        $('#stop').prop('disabled', true);
        $('#play').prop('disabled', false);
    }
}