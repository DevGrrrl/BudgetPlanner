const { homeHandler, staticFileHandler, signUpHandler, loginHandler, logoutHandler, addItemHandler, sumAllHandler, displayItemsHandler } = require('./handler');

const router = (request, response) => {

    const endpoint = request.url;
    if (endpoint === '/') {
        homeHandler(request, response);
    } else if (endpoint.indexOf("public") !== -1) {
        staticFileHandler(request, response, endpoint);
    } else if (endpoint.indexOf("signup") !== -1){
        signUpHandler(request, response, endpoint);
    } else if (endpoint.indexOf("login") !== -1){
        loginHandler(request, response, endpoint);
    } else if (endpoint.indexOf("logout") !== -1){
        logoutHandler(request, response, endpoint);
    } else if (endpoint.indexOf("add") !== -1) {
        addItemHandler(request, response, endpoint);
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
