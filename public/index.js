/* eslint-disable */
var form = document.getElementById('form');
var user = document.getElementById('username');
var category = document.getElementById('category');
var itemCost = document.getElementById('cost');
var datePurchased = document.getElementById('date');
var btn = document.getElementById('generateCost');
var dataContainer = document.getElementById('data_container');

window.onload = function() {
    displayCurrentItems();
};

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

//populate DOM with cummulative items
function displayCurrentItems() {
    request('displayItems', 'GET', function(err, res) {
        if (err) console.log(err);
        clearDataContainer();
        var table = document.createElement('table');
        table.className = 'table';
        var tr = document.createElement('tr');
        tr.appendChild(document.createElement('td'));
        tr.appendChild(document.createElement('td'));
        tr.appendChild(document.createElement('td'));
        tr.appendChild(document.createElement('td'));
        tr.cells[0].appendChild(document.createTextNode("Name"));
        tr.cells[1].appendChild(document.createTextNode("Cost"));
        tr.cells[2].appendChild(document.createTextNode("Category"));
        tr.cells[3].appendChild(document.createTextNode("Date"));
        table.appendChild(tr);
        res.forEach(function(item, i) {
            var date = new Date(res[i].date_purchased);
            var options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
            var tr = document.createElement('tr');
            tr.appendChild(document.createElement('td'));
            tr.appendChild(document.createElement('td'));
            tr.appendChild(document.createElement('td'));
            tr.appendChild(document.createElement('td'));
            tr.cells[0].appendChild(document.createTextNode(res[i].user_name));
            tr.cells[1].appendChild(document.createTextNode("£" + Number(res[i].cost).toFixed(2)));
            tr.cells[2].appendChild(document.createTextNode(convertText(res[i].category)));
            tr.cells[3].appendChild(document.createTextNode(date.toLocaleDateString('en-GB', options)));
            table.appendChild(tr);
        })
        dataContainer.appendChild(table)
    })
}

function clearDataContainer() {
    while (dataContainer.hasChildNodes()) {
        dataContainer.removeChild(dataContainer.lastChild);
    }
}

function convertText(str) {
    return str.split('-').join(' ').toLowerCase()
}

convertText('bill-payments')

form.addEventListener('submit', function(event) {
    event.preventDefault();
    var newItem = {
        username: user.value,
        category: category.value,
        cost: itemCost.value,
        date: datePurchased.value
    }
    request('input', 'POST', function(err, res) {
        if (err) console.log(err);
        displayCurrentItems();
    }, JSON.stringify(newItem))
})

btn.addEventListener('click', function(event) {
    event.preventDefault();
    request('sumall', 'GET', function(err, res) {
        if (err) console.log(err);
        clearDataContainer();
        var table = document.createElement('table');
        table.className = 'table';
        var tr = document.createElement('tr');
        tr.appendChild(document.createElement('td'));
        tr.appendChild(document.createElement('td'));
        tr.cells[0].appendChild(document.createTextNode("Name"));
        tr.cells[1].appendChild(document.createTextNode("Total spent"));
        table.appendChild(tr);
        res.forEach(function(item, i) {
            var tr = document.createElement('tr');
            tr.appendChild(document.createElement('td'));
            tr.appendChild(document.createElement('td'));
            tr.cells[0].appendChild(document.createTextNode(res[i].user_name));
            tr.cells[1].appendChild(document.createTextNode("£" + Number(res[i].sum).toFixed(2)));
            table.appendChild(tr);
        })
        dataContainer.appendChild(table)
    })
})