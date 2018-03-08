'use strict'

function route(pathname, handle, request, response) {
    console.log('Request for ' + pathname);
    if (typeof handle[pathname] === 'function') {
        handle[pathname](request, response);
    } else {
        response.writeHead(404);
        response.end('404 Not Found');
    }
}

module.exports.route = route;