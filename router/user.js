const express = require('express');
const pool = require('../pool.js');
const router = express.Router();

//登录验证
router.post('/login',(req,res)=>{
    var {uname,upwd} = req.body;
    console.log(uname,upwd);
    var sql = 'SELECT * FROM xz_user WHERE uname=? AND upwd=?';
    pool.query(sql,[uname,upwd],(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            console.log('存在')
            res.writeHead(200,{
                "content-Type":"application/json;charset=utf-8",
                "Access-Control-Allow-Origin":"*"
              });
              
            res.write(JSON.stringify({code:'200',msg:'success'}))
            res.end();
        }else{
            res.send({code:300,msg:'there is no '});
        }
    });
});

//异步ajax获取对应账号的图片
router.get('/',(req,res)=>{
    var uname = req.query.uname;
    var sql = 'select pic from xz_pic where uid = (select uid from xz_user where uname ?)';
    pool.query(sql,[uname],(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.send({code:200,data:result});
        }else{
            res.send({code:300,msg:'select err'});
        }
    });
});


//异步ajax验证注册的用户名是否存在
router.get('/',(req,res)=>{
    var uname = req.query.uname;
    var sql = 'select * form xz_user where uname = ?';
    pool.query(sql,[uname],(err,result)=>{
        if(err) throw err;
        if(result.length > 0) res.send({code:'300',msg:'This name is exists'});
    });
})

//注册
router.post('/register',(req,res)=>{
    var {uname,upwd,email,gender,nicheng} = req.body;
    var sql = 'insert into xz_user (uname,upwd,email,gender,nicheng) values (null,?,?,?,?,?)';
    pool.query(sql,[uname,upwd,email,gender,nicheng],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows > 0) res.send({code:200,msg:'regester is success!'});
    })
});

module.exports = router;