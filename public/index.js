/* eslint-disable */
var form = document.getElementById('form');
var user = document.getElementById('username');
var category = document.getElementById('category');
var itemCost = document.getElementById('cost');
var datePurchased = document.getElementById('date');
var submit = document.getElementById('submitForm');
var btn = document.getElementById('generateCost');

//event listener on form input, validate data
form.addEventListener('submit', function(event) {
  event.preventDefault();
  //validate data
  var itemObject = {
    userName : user.value,
    categoryType : category.value,
    cost : itemCost.value,
    date :datePurchased.value
  }

  request(itemObject);
});

//xhr request to the backend
function request(item, cb){
  let url = '/input';
  var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 200) {

    } else {
      alert('Something went wrong with the data');
    }
    console.log(item);
    xhr.open("POST", url, true);
    xhr.send(item);
  }
}
