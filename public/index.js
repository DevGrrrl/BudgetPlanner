/* eslint-disable */
var form = document.getElementById('form');
var user = document.getElementById('username');
var category = document.getElementById('category');
var itemCost = document.getElementById('cost');
var datePurchased = document.getElementById('date');
var submit = document.getElementById('submitForm');
var btn = document.getElementById('generateCost');
var table = document.getElementById('table');
var tableContainer = document.getElementById('table_container');

//XMLHttpRequest to refresh data in table whenever page refreshes
window.onload = function() {
  clearPage();
  getCurrentResults();
};
//tell database to drop tables

btn.addEventListener('click', function(e){

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var result = JSON.parse(xhr.responseText);
        clearPage();
        updateDomFinal(result);
      }
    };
    xhr.open("GET", "/finalResults", true);
    xhr.send(body);

});

//update dom with results
function updateDomFinal(obj){

}

//clear page
function clearPage(){
  while(tableContainer.firstElementChild){
    tableContainer.removeChild(tableContainer.firstElementChild);
  }
}

function getCurrentResults(){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var result = JSON.parse(xhr.responseText);
        updateDomCurrent(result);
    }
  };
  xhr.open("GET", "/currentResults", true);
  xhr.send();

}

function updateDomCurrent(obj){
  
}
