let form = document.getElementById('form');
let login = document.getElementById('login');
let password = document.getElementById('password');
let status;

form.addEventListener('submit', e =>
{
    e.preventDefault();
});

const signIn = async () =>
{
    status = '';

    if (login.value == '')
        status += 'emptyLogin';
    
    if (password.value == '')
        status += 'emptyPassword';

    if (status == '')
        status = await sendRequest('GET', path + 'php/processing.php?login=' + login.value + '&password=' + password.value);

    if (status == 'confirmed')
        location.href = website;
    else if (status == 'rejected')
    {
        password.value = '';
        $('#password').focus();
        $('#msgPassword').text('Nieprawidłowy login lub hasło');
    }
    else
    {
        if (status == 'emptyLogin' || status == 'emptyLoginemptyPassword')
        {
            $('#login').addClass('is-invalid');
            $('#msgLogin').text('Uzupełnij pole');
        }

        if (status == 'emptyPassword' || status == 'emptyLoginemptyPassword')
        {
            $('#password').addClass('is-invalid');
            $('#msgPassword').text('Uzupełnij pole');
        }
    }
}

function fillInLogin()
{
    if (login.value != '')
    {
        $('#login').removeClass('is-invalid');
        $('#msgLogin').text('');
    }
    else if (status == 'emptyLogin' || status == 'emptyPassword' || status == 'emptyLoginemptyPassword')
    {
        $('#login').addClass('is-invalid');
        $('#msgLogin').text('Uzupełnij pole');
    }
}

function fillInPassword()
{
    if (password.value != '' && (status == 'emptyLogin' || status == 'emptyPassword' || status == 'emptyLoginemptyPassword'))
    {
        $('#password').removeClass('is-invalid');
        $('#msgPassword').text('');
    }
    else if (status == 'emptyLogin' || status == 'emptyPassword' || status == 'emptyLoginemptyPassword')
    {
        $('#password').addClass('is-invalid');
        $('#msgPassword').text('Uzupełnij pole');
    }
}