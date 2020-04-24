var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)
    if (path === '/' || path === '/index.html') {
        response.statusCode = 200
        response.setHeader('content-type', 'text/html;charset=utf-8')
        response.write(fs.readFileSync('src/index.html'))
        response.end()
    } else if (path === '/src/style.css') {
        response.statusCode = 200
        response.setHeader('content-type', 'text/css;charset=utf-8')
        response.write(fs.readFileSync('src/style.css'))
        response.end()
    } else if (path === '/src/req.js') {
        response.statusCode = 200
        response.setHeader('content-type', 'text/javascript;charset=utf-8')
        response.write(fs.readFileSync('src/req.js'))
        response.end()
    } else if (path === '/src/another.js') {
        response.statusCode = 200
        response.setHeader('content-type', 'text/javascript;charset=utf-8')
        response.write(fs.readFileSync('src/another.js'))
        response.end()
    } else if (path === '/src/another.html') {
        response.statusCode = 200
        response.setHeader('content-type', 'text/html;charset=utf-8')
        response.write(fs.readFileSync('src/another.html'))
        response.end()
    } else if (path === '/src/paint.png') {
        response.statusCode = 200
        response.setHeader('content-type', 'image/png') //图片和文本的请求头是不一样的
        response.write(fs.readFileSync('src/paint.png'))
        response.end()
    } else if (path === '/src/a.xml') {
        response.statusCode = 200
        response.setHeader('content-type', 'text/xml;charset=utf-8')
        response.write(fs.readFileSync('src/a.xml'))
        response.end()
    } else if (path === '/database/page1.json') {
        response.statusCode = 200
        response.setHeader('content-type', 'text/json;charset=utf-8')
        response.write(fs.readFileSync('database/page1.json'))
        response.end()
    } else if (path === '/database/page2.json') {
        response.statusCode = 200
        response.setHeader('content-type', 'text/json;charset=utf-8')
        response.write(fs.readFileSync('database/page2.json'))
        response.end()
    } else if (path === '/database/page3.json') {
        response.statusCode = 200
        response.setHeader('content-type', 'text/json;charset=utf-8')
        response.write(fs.readFileSync('database/page3.json'))
        response.end()
    } else {
        response.statusCode = 404
        response.end()
    }



    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)