/* eslint-disable */
var form = document.getElementById('form');
var user = document.getElementById('username');
var category = document.getElementById('category');
var itemCost = document.getElementById('cost');
var datePurchased = document.getElementById('date');
var btn = document.getElementById('generateCost');
var logoutBtn = document.getElementById('logout');
var dataContainer = document.getElementById('data_container');
var displayUsername = document.getElementById('display_username');

window.onload = function() {
    displayCurrentItems();
    request('username', 'GET', function(err, res) {
        if (err) {
            console.log(err)
        } else {
            displayUsername.innerText = res
        }
    })
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
        var itemContainer = document.createElement('div');
        itemContainer.className = 'item_container';
        res.forEach(function(item, i) {
            var date = new Date(res[i].date_purchased);
            var options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
            var line = document.createElement('p');
            var concatItem = document.createTextNode(res[i].user_name + " spent " + "£" + Number(res[i].cost).toFixed(2) + " on " + convertText(res[i].category) + " on " + date.toLocaleDateString('en-GB', options));
            line.appendChild(concatItem);
            itemContainer.appendChild(line);
        })
        dataContainer.appendChild(itemContainer);

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
        category: category.value,
        cost: itemCost.value,
        date: datePurchased.value
    }
    request('add', 'POST', function(err, res) {
        if (err) console.log(err);
        displayCurrentItems();
    }, JSON.stringify(newItem));

    category.value = "";
    itemCost.value = "";
    datePurchased.value = "";
})

//Sum All button
btn.addEventListener('click', function(event) {
    event.preventDefault();
    request('sumall', 'GET', function(err, res) {
        if (err) console.log(err);
        clearDataContainer();
        var summedCosts = res.summedCosts;
        var average = res.average;
        /* Total user Spending */
        var sum_container = document.createElement('div');
        sum_container.className = 'item_container';
        var heading = document.createElement('h3');
        var headerText = document.createTextNode('Total Spent');
        heading.appendChild(headerText);
        sum_container.appendChild(heading);
        summedCosts.forEach(function(item, i) {
            var displaytext = document.createElement('p');
            displaytext.appendChild(document.createTextNode(summedCosts[i].user_name + " has spent a total of £" + Number(summedCosts[i].sum).toFixed(2)));
            sum_container.appendChild(displaytext);
        })
        dataContainer.appendChild(sum_container);
        /* Average Spending */
        var heading = document.createElement('h3');
        var headerText = document.createTextNode('The average amount spent was £' + average);
        heading.appendChild(headerText);
        sum_container.appendChild(heading);
    })
})

logoutBtn.addEventListener('click', function(event) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 201) {
            window.location.href = xhr.getResponseHeader('location');
        }
    }
    xhr.open('GET', 'logout', true);
    xhr.send();
})