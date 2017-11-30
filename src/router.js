const { homeHandler, staticFileHandler, inputHandler, sumAllHandler, displayItemsHandler } = require('./handler');

const router = (request, response) => {

    const endpoint = request.url;
    if (endpoint === '/') {
        homeHandler(request, response);
    } else if (endpoint.indexOf("public") !== -1) {
        staticFileHandler(request, response, endpoint);
    } else if (endpoint.indexOf("input") !== -1) {
        inputHandler(request, response, endpoint);
    } else if (endpoint.indexOf("sumall") !== -1) {
        sumAllHandler(request, response);
    } else if (endpoint.indexOf("displayItems") !== -1) {
        displayItemsHandler(request, response);
    } else {
        response.writeHead('404', {
            'Content-Type': 'text/html'
        });
        response.end('404, file not found');
    }

}
module.exports = router;