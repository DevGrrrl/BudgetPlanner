const {
  homeHandler,
  staticFileHandler,
  signUpHandler,
  loginHandler,
  mainPageHandler,
  logoutHandler,
  addItemHandler,
  sumAllHandler,
  displayItemsHandler
} = require('./handler');

const router = (request, response) => {

    const endpoint = request.url;
    if (endpoint === '/') {
        homeHandler(request, response);
    } else if (endpoint.includes("public")) {
        staticFileHandler(request, response, endpoint);
    } else if (endpoint.includes("auth_check")) {
        authCheckHandler(request, response);
    } else if (endpoint.includes("signup")) {
        signUpHandler(request, response);
    } else if (endpoint.includes("login")) {
        loginHandler(request, response);
    } else if (endpoint.includes("logout")) {
        logoutHandler(request, response);
    } else if (endpoint.includes("main")) {
        mainPageHandler(request, response);
    } else if (endpoint.includes("add")) {
        addItemHandler(request, response);
    } else if (endpoint.includes("sumall")) {
        sumAllHandler(request, response);
    } else if (endpoint.includes("displayItems")) {
        displayItemsHandler(request, response);
    } else {
        response.writeHead('404', {
            'Content-Type': 'text/html'
        });
        response.end('404, file not found');
    }

}
module.exports = router;
