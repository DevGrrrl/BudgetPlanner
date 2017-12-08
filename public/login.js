//validate passwords matching

var signupPassword1 = document.getElementById('signupPW1');
var signupPassword2 = document.getElementById('signupPW2');
var validateSignup = document.getElementById('validateMsgSignup');
var validateLogin = document.getElementById('validateMsgLogin');
var formSubmit = document.getElementById('form-signup');


signupPassword2.addEventListener('input', function(event) {
    if (validateSignup.childElementCount > 0) {
        validateSignup.removeChild(validateSignup.lastChild);
    }
    if (signupPassword1.value !== signupPassword2.value) {
        var pMsg = document.createElement('p');
        var errorMsg = document.createTextNode('Passwords do not match');
        pMsg.appendChild(errorMsg);
        validateSignup.appendChild(pMsg);
    }
});
