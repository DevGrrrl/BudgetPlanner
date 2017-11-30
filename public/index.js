/* eslint-disable */
var form = document.getElementById('form');
var user = document.getElementById('username');
var category = document.getElementById('category');
var itemCost = document.getElementById('cost');
var datePurchased = document.getElementById('date');
var submit = document.getElementById('submitForm');
var btn = document.getElementById('generateCost');
var dataContainer = document.getElementById('data_container');


//generic xhr XMLHttpRequest
function request(url, method, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4) {
      if(xhr.status === 200) {
        cb(null, JSON.parse(xhr.responseText));
      } else {
        var errorMessage = JSON.parse(xhr.responseText);
        cb("Error" + url + " " + errorMessage);
      }
    }
  };
  xhr.open(method, url, true);
  xhr.send();
}


//populate DOM with cummulative items
function displayCurrentItems(test) {
  request('/displayItems', 'GET', function(err, res) {
    if err console.log(err);

    table = document.createElement('table');
    test.forEach(function (item, i) {
      var tr = document.createElement('tr');

      tr.appendChild( document.createElement('td') );
      tr.appendChild( document.createElement('td') );
      tr.appendChild( document.createElement('td') );
      tr.appendChild( document.createElement('td') );

      tr.cells[0].appendChild( document.createTextNode(test.user_name) );
      tr.cells[1].appendChild( document.createTextNode(test.cost) );
      tr.cells[2].appendChild( document.createTextNode(test.category) );
      tr.cells[3].appendChild( document.createTextNode(test.date_purchased) );

      table.appendChild(tr);
    })
  })
}

 var test = [ { user_name: 'Alina', cost: 9.3, category: 'Groceries', date_purchased: 'Wed Nov 29 2017 00:00:00 GMT+0000 (GMT)' }, { user_name: 'Alina', cost: 9.3, category: 'Groceries',
 date_purchased: 'Wed Nov 29 2017 00:00:00 GMT+0000 (GMT)' } ]


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
