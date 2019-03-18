const express = require('express');
const fs = require('fs');
// 引入 body-parser 中间件，获取 post 传输过来的数据
const bodyParser = require('body-parser');
const router = require('./router');
const app = express();
// 配置 body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('html', require('express-art-template'));

app.use('/node_modules/', express.static('./node_modules/'));

app.use('/public/', express.static('./public/'));

app.use(router);

app.listen(8888, function() {
	console.log('running');
})
