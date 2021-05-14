var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, body){
    return `
            <!doctype html>
            <!doctype html>
            <html>
            <head>
                <title>WEB - ${title}</title>
                <meta charset="utf-8">
            </head>
            <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            ${body}
            </body>
            </html>
            `;
}

function templateList(filelist){
    /*
    var list = `
        <ol>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
            <li><a href="/?id=HelloHTML">Hello HTML</a></li>
        </ol>`
     */

    var list = '';

    list += '<ol>'
    var i = 0;
    while(i<filelist.length){
        list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>\n`
        i ++
    }
    list += '</ol>'

    return list
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var querydata = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var title = querydata.id;

    console.log(`url: ${_url}`);

    if(pathname === '/') {
        fs.readFile(`data/${querydata.id}`, 'utf-8', function (err, description) {
            if(querydata.id === undefined){
                title = 'welcome';
                description = 'Hello, Node.js'
            }

            fs.readdir('data/', function (error, filelist) {
                var list = templateList(filelist)
                var template = templateHTML(title, list, `<h2>${title}</h2> <p>${description}</p>`)

                response.writeHead(200);
                response.end(template);
            })

        })
    } else {
      response.writeHead(404);
      fs.readFile('src/not_found.html', 'utf-8', function (err, description){
         response.end(description);
      })
    }

})

app.listen(3000);
