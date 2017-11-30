const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const checkUser = require('./queries/check_user');
const createUser = require('./queries/create_user');
const setNewItem = require('./queries/set_new_item');
const getCostsPerPerson = require('./queries/get_costs_per_person');

const homeHandler = (request, response) => {
    fs.readFile(path.join(__dirname, '..', 'public', 'index.html'), 'utf8', (err, file) => {
        if (err) {
            response.writeHead(500, {
                'content-type': 'text/plain'
            })
            response.end('Server error');
        } else {
            response.writeHead(200, {
                'content-type': 'text/html'
            })
            response.end(file);
        };

    })
};

const staticFileHandler = (request, response, endpoint) => {
    const extensionType = {
            html: 'text/html',
            css: 'text/css',
            js: 'application/javascript',
        }
        /* UPADATE THIS*/
    const extension = endpoint.split('.')[1];
    const filePath = path.join(__dirname, '..', endpoint);
    fs.readFile(filePath, (err, file) => {
        if (err) response.end('error');
        response.writeHead(200, 'Content-Type: ' + extensionType[extension]);
        response.end(file);
    })
};

const inputHandler = (request, response, endpoint) => {
    var allTheData = '';
    request.on('data', function(chunckOfData) {
        allTheData += chunckOfData;
    });
    request.on('end', function() {
        const newItem = querystring.parse(allTheData);

        checkUser(newItem, (err, res) => {
            if (err) console.log(err)
            if (res === 0) {
                createUser(newItem, (err, res) => {
                    if (err) console.log(err)
                    setNewItem(newItem, (err, res) => {
                        if (err) console.log(err)
                            //else call query which passes back all items with status false
                        response.writeHead(200, { 'content-type': 'application/json' })
                        response.end(JSON.stringify(testArr));
                    })
                })
            } else if (res === 1) {
                setNewItem(newItem, (err, res) => {
                    if (err) console.log(err)
                        //else call query which passes back all items with status false
                    response.writeHead(200, { 'content-type': 'application/json' })
                    response.end(JSON.stringify(testArr));
                })
            }
        })
    })
};

const sumAllHandler = (request, response) => {
    getCostsPerPerson((err, res) => {
        if (err) console.log(err)
        response.writeHead(200, { 'content-type': 'application/json' })
        console.log(res)
        response.end(JSON.stringify(res));
    })
}

/*TEST ARRAY*/

let testArr = [{
        user_name: 'Alina',
        cost: 2.45,
        category: 'Groceries',
        date_purchased: "2017-11-29T00:00:00.000Z"
    },
    {
        user_name: 'Alina',
        cost: 1,
        category: 'bill-payments',
        date_purchased: "2017-11-02T00:00:00.000Z"
    },
    {
        user_name: 'James',
        cost: 3,
        category: 'household-item',
        date_purchased: "2017-11-01T00:00:00.000Z"
    }
]

module.exports = { homeHandler, staticFileHandler, inputHandler, sumAllHandler }