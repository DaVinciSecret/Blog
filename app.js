const express = require('express');
const bodyParser = require('body-parser');

const app = express();
//导入路由
const user = require('./router/user');

var server = app.listen(3000,()=>{
    console.log("Server is Running");
})
app.use(express.static('./public'));

app.use(bodyParser.urlencoded({
    extended:false
}));


//挂载路由器
app.use('/user',user);