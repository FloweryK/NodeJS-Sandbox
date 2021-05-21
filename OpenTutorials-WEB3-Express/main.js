var fs = require('fs')
var qs = require('qs')
var path = require('path')
var sanitizeHtml = require('sanitize-html')
var express = require('express')
var template = require('./lib/template')

var app = express()

app.get('/', function(req, res) {
    fs.readdir('./data', 'utf-8', function(err, filelist) {
        var title = 'welcome'
        var description = 'Hello, Node.js'

        var list = template.list(filelist)
        var html = template.HTML(title, list,
            `<h2>${title}</h2> <p>${description}</p>`,
            `<a href="/create">create</a>`)

        res.status(200).send(html)
    })
})

app.get('/page/:pageId', function(req, res) {
    fs.readdir('./data', 'utf-8', function(err, filelist) {
        var pageId = req.params.pageId
        var pageIdFiltered = path.parse(req.params.pageId).base

        fs.readFile(`data/${pageIdFiltered}`, 'utf-8', function(err, description) {
            var title = pageId
            var titleSanitized = sanitizeHtml(title)
            var descriptionSanitized = sanitizeHtml(description, {allowedTags: ['h1']})

            var list = template.list(filelist)
            var html = template.HTML(titleSanitized, list,
                `<h2>${title}</h2> <p>${descriptionSanitized}</p>`,
                `<a href="/create">create</a>
                 <a href="/update?id=${titleSanitized}">update</a>
                 <form action="delete_process" method="post">
                    <input type="hidden" name="id" value="${titleSanitized}">
                    <input type="submit" value="delete">
                 </form>`)

            res.status(200).send(html)
        })
    })
})

app.get('/create', function(req, res){
    fs.readdir('./data', 'utf-8', function(err, filelist) {
        var title = 'WEB - create'
        var list = template.list(filelist)
        var html = template.HTML(title, list, `
          <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
        `, '')

        res.status(201).send(html)
    })
})

app.post('/create_process', function(req, res){
    var body = ''
    req.on('data', function(data){
        body = body + data
    })
    req.on('end', function(){
        var post = qs.parse(body)
        var title = post.title
        var description = post.description
        fs.writeFile(`data/${title}`, description, 'utf8', function(err){
            res.status(302).send({Location: `/?id=${title}`})
        })
    })
})


app.listen(3000, () => console.log('example app listening on port 3000'))

/*
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
    /!*
    var list = `
        <ol>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
            <li><a href="/?id=HelloHTML">Hello HTML</a></li>
        </ol>`
     *!/

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
*/
