/* eslint-disable */
var form = document.getElementById('form');
var user = document.getElementById('username');
var category = document.getElementById('category');
var itemCost = document.getElementById('cost');
var datePurchased = document.getElementById('date');
var submit = document.getElementById('submitForm');
var btn = document.getElementById('generateCost');


//event listener on form input, then call request
// form.addEventListener('submit', function(event) {
//   event.preventDefault();
//   var itemObject = {
//     userName : user.value,
//     categoryType : category.value,
//     cost : itemCost.value,
//     date :datePurchased.value
//   }
//   var url = '/input';
//   request(url, 'POST', cb, itemObject);
// });

//generic http request, what do we want the callback function to do? render?
function request(url, method, cb, body) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var result = JSON.parse(xhr.responseText);
      cb(result);
    }
  };
  xhr.open(reqType, url, true);
  xhr.send(body);
}
