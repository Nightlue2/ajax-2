//先请求，再布置文件，最后响应，但是我们这里先把文件设置好
let n = 0
function res(path, fn) {
    let request = new XMLHttpRequest()
    request.open('GET', path)
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 400) {
                fn(request)
            } else {
                console.log('请求失败了...')
            }
        }
    }
    request.send()
}

showCSS.onclick = () => {
    res('src/style.css', (request) => {
        let style = document.createElement('style')
        style.textContent = request.response
        document.head.appendChild(style)
    })
}

showJS.onclick = () => {
    res('src/another.js', (request) => {
        let script = document.createElement('script')
        script.textContent = request.response
        document.body.appendChild(script)
    }) //拿到another这个js文件后，需要把它放进文档里，不然只是拿到响应但是不会产生效果
}

showHTML.onclick = () => {
    res('src/another.html', (request) => {
        console.log('图片请求成功')
        picture.innerHTML = request.response
        picture.style.visibility = 'visible'
    })
}

showXML.onclick = () => {
    res('src/a.xml', (request) => {
        let warning = request.responseXML
        alert(warning.getElementsByTagName('warning')[0].textContent.trim()) //不用trim文本不好看
    })
}

showJSON.onclick = () => {
    res('database/page1.json', (request) => {
        if (n === 0) n = n + 1
        let object = JSON.parse(request.response)
        let string1 = Object.keys(object)[0].toString() + ": " + object.num
        let string2 = Object.keys(object)[1].toString() + ": " + object.another
        hide.style.visibility = "visible"
        hide.innerHTML = string1 + "<br/>" + string2
    })
}

nextPage.onclick = () => {
    if (n >= 1 && n <= 2)
        res(`database/page${n + 1}.json`, (request) => {
            let object = JSON.parse(request.response)
            let string1 = Object.keys(object)[0].toString() + ": " + object.num
            let string2 = Object.keys(object)[1].toString() + ": " + object.another
            hide.innerHTML = hide.innerHTML + "<br/>" + string1 + "<br/>" + string2
            n = n + 1
        })
}
