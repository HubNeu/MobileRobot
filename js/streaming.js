const stream = document.getElementById('stream-box');
let status, state;

const streaming = async () =>
{
	if (status == null)
	{
        state = await sendRequest('GET', path + 'php/processing.php', 'streaming=status');

		if (state != 'OFF')
		{
			status = true;
			stream.src = state;
			$('#stop-stream').prop('disabled', false);
		}
		else
		{
			status = false;
			$('#play-stream').prop('disabled', false);
		}
	}
    else if (status)
    {
		$('#play-stream').prop('disabled', true);
		state = await sendRequest('GET', path + 'php/processing.php', 'streaming=on');
		stream.src = state;
		$('#stop-stream').prop('disabled', false);
    }
    else
    {
		$('#stop-stream').prop('disabled', true);
		stream.src = path + 'img/screensaver-image.jpg';
		await sendRequest('GET', path + 'php/processing.php', 'streaming=off');
		$('#play-stream').prop('disabled', false);
    }
}

function switch_stream()
{
    status = !status;
    streaming();
}

function shutdown()
{
    sendRequest('GET', path + 'php/processing.php', 'shutdown=true');
}

if (stream != null)
    streaming();