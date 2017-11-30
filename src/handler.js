const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

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
    request.on('data', function(chunckOfData){
      allTheData += chunckOfData;
    });
    request.on('end', function(){
      const parsed = querystring.parse(allTheData);
      checkUser(parsed);
    })

};
module.exports = { homeHandler, staticFileHandler, inputHandler }
