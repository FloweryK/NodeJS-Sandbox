var http = require('http')
var url = require('url')                            // url을 parsing하려면 Node.js의 url 모듈이 필요하다

var app = http.createServer(function(req, res){
    var _url = req.url
    var query = url.parse(_url, true).query
    var pathname = url.parse(_url, true).pathname

    var text = ''
    text += `pathname: ${pathname}\n`               // pathname은 그냥 string으로 가져와짐
    for (var key in query){                         // query는 여러개 있을 수 있어서 dictObject로 가져와짐
        text += `query: ${key} = ${query[key]}\n`
    }
    res.end(text)
})

app.listen(port=3000)