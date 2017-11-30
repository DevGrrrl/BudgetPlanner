/* eslint-disable */
var form = document.getElementById('form');
var user = document.getElementById('username');
var category = document.getElementById('category');
var itemCost = document.getElementById('cost');
var datePurchased = document.getElementById('date');
var submit = document.getElementById('submitForm');
var btn = document.getElementById('generateCost');


//tell database to drop tables

btn.addEventListener('click', function(e){

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var result = JSON.parse(xhr.responseText);
        clearPage();
        updateDom(result);
      }
    };
    xhr.open("GET", "/finalResults", true);
    xhr.send(body);

});

//update dom with results
function updateDom(result){

}
//clear page 
function clearPage(){

}
