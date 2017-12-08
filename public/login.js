//validate passwords matching

var signupPassword1 = document.getElementById('signupPW1');
var signupPassword2 = document.getElementById('signupPW2');
var validateSignup = document.getElementById('validateMsgSignup');
var validateLogin = document.getElementById('validateMsgLogin');
var pwRequirements = document.getElementById('passwordInvalidMessage');
var loginPassW = document.getElementById('loginPW');
var signupName = document.getElementById('sign-upName');
var loginName = document.getElementById('loginName');

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


// signupPassword1.setCustomValidity("Password must be 8 or more characters long and contain at least: 1 uppcase letter, 1 lowercase letter, and 1 number");
// signupPassword2.setCustomValidity("Password must be 8 or more characters long and contain at least: 1 uppcase letter, 1 lowercase letter, and 1 number");
// loginPassW.setCustomValidity("Password must be 8 or more characters long and contain at least: 1 uppcase letter, 1 lowercase letter, and 1 number");
// signupName.setCustomValidity("Name must only contain upper and lowercase letters");
// loginName.setCustomValidity("Name must only contain upper and lowercase letters");

// signupName.oninvalid = function(event) {
//     event.target.setCustomValidity('Name must only contain upper and lowercase letters');
// }
