const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const { parse } = require('cookie');
const { sign, verify } = require('jsonwebtoken');
const checkUser = require('./queries/check_user');
const createUser = require('./queries/create_user');
const setNewItem = require('./queries/set_new_item');
const getCostsPerPerson = require('./queries/get_costs_per_person');
const unpaidItems = require('./queries/unpaid_items.js');
const markAsPaid = require('./queries/mark_as_paid');


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
    const extension = endpoint.split('.')[1];
    const filePath = path.join(__dirname, '..', endpoint);
    fs.readFile(filePath, (err, file) => {
        if (err) response.end('error');
        response.writeHead(200, 'Content-Type: ' + extensionType[extension]);
        response.end(file);
    })
};

const signupHandler = (request, response, endpoint) => {
  var allTheData = '';
  request.on('data', (chunckOfData) => {
      allTheData += chunckOfData;
  });
  request.on('end', () => {
      const userData = JSON.parse(allTheData);

  //hash and validate here

  checkUser(userData, (err, res) => {
      if (err) console.log(err)
      if (res === 0) {
          createUser(userData, (err, res) => {
              if (err) console.log(err)
              const cookie = sign(JSON.stringify(res), SECRET);
                   res.writeHead(302,{'Location': '/','Set-Cookie': `jwt=${cookie}; HttpOnly`});
            }
          }
        }
        response.end();
      }


const addItemHandler = (request, response, endpoint) => {
    var allTheData = '';
    request.on('data', (chunckOfData) => {
        allTheData += chunckOfData;
    });
    request.on('end', () => {
        const newItem = JSON.parse(allTheData);
        console.log(newItem);
        setNewItem(newItem, (err, res) => {
            if (err) console.log(err)
            response.writeHead(200, { 'content-type': 'application/json' })
            response.writeHead(200, { 'location': '/' })
            response.end(JSON.stringify(res));
            })
          })
        }
    })
};

const sumAllHandler = (request, response) => {
    getCostsPerPerson((err, res) => {
        if (err) console.log(err)
          response.writeHead(200, { 'content-type': 'application/json' })
          response.end(JSON.stringify(res));
        markAsPaid((err, res) => {
          if(err) console.log(err);
            response.writeHead(200, { 'content-type': 'text/html' })
            response.end('All items paid.');
        });
    })
}


const displayItemsHandler = (request, response) => {
    unpaidItems((err, res) => {
        if (err) console.log(err)
        response.writeHead(200, { 'content-type': 'application/json' })
        response.end(JSON.stringify(res));
    })
}

module.exports = { homeHandler, staticFileHandler, inputHandler, sumAllHandler, displayItemsHandler }
