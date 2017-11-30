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
        console.log(JSON.parse(xhr.responseText));
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
function displayCurrentItems() {
  request('displayItems', 'GET', function(err, res) {
    if (err) console.log(err);
    console.log(res);
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

displayCurrentItems();


function sumAll(){
  request('sumall', 'GET', function(err, res) {
    if (err) console.log(err);
    console.log(res);
  }) 
}

sumAll();
//update dom with results
// function updateDomFinal(obj){
//
// }

//clear page
// function clearPage(){
//   while(tableContainer.firstElementChild){
//     tableContainer.removeChild(tableContainer.firstElementChild);
//   }
// }
