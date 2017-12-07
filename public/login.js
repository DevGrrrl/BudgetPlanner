//validate passwords matching

var signupPassword1 = document.getElementById('signupPW1');
var signupPassword2 = document.getElementById('signupPW2');
var validateSignup = document.getElementById('validateMsgSignup');
var validateLogin = document.getElementById('validateMsgLogin');
var formSubmit = document.getElementById('form-signup');

window.onload = function() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 201) {
                window.location.href = xhr.getResponseHeader('Location')
            }
        }
    };
    xhr.open('GET', 'auth_check', true);
    xhr.send();
}

formSubmit.addEventListener('submit', function(event) {
    if (validateSignup.childElementCount > 0) {
        validateSignup.removeChild(validateSignup.lastChild);
    }
    var form_valid = (signupPassword1.value === signupPassword2.value);
    if (!form_valid) {
        var pMsg = document.createElement('p');
        var errorMsg = document.createTextNode('Passwords do not match');
        pMsg.appendChild(errorMsg);
        validateSignup.appendChild(pMsg);
        return false;
    }
    return true;
})


//generic xhr XMLHttpRequest
function request(url, method, cb, body) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                cb(null, JSON.parse(xhr.responseText));
            } else {
                var errorMessage = JSON.parse(xhr.responseText);
                cb("Error" + url + " " + errorMessage);
            }
        }
    };
    xhr.open(method, url, true);
    xhr.send(body);
}