'use strict'

var fs = require('fs');
// 这个路径是我这台电脑上的
var formidable = require('/usr/local/lib/node_modules/formidable');

function start(request, response) {
    console.log('Start was called...');

    response.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream('./html/form.html', 'utf-8').pipe(response);
}

function upload(request, response) {
    console.log('Upload was called...');
    
    var form = formidable.IncomingForm();
    form.encoding = 'utf-8';
    // 解析request
    form.parse(request, function(err, fileds, files) {
        // 添加的代码
        fs.renameSync(files.upload.path, __dirname + '/tmp/test.jpg');
        response.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'});
        response.write('<p>The text you input: ' + fileds.text + '</p>');
        response.write('<p>Receive image:</p>');
        response.write('<img src="/show"  alt="show">')
        response.end();
    });
}

function show(request, response) {
    fs.readFile('./tmp/test.jpg', 'binary', function (err, file) {
        if (err) {
            response.writeHead(500, {'Content-Type': 'text/plain'});
            response.write(err + '\n');
            response.end();
        } else {
            response.writeHead(200, {'Content-Type': 'image/jpg'});
            response.write(file, 'binary');
            response.end();
        }
    });
}

module.exports = {
    start: start,
    upload: upload,
    show: show
};