var express = require('express');
var router = express.Router();
var User = require("../model/user");
var md5 = require("md5");

router.get('/', function(req, res, next) {
 	res.render('login', { title: '登录',isShow:false,tttt:''});
});
router.post('/',function(req,res){
	console.log(req.body);
	User.find({
		email:req.body.email
	}).then(function(result){
		console.log(result);
		if(result.length==0){
			res.render('login',{title: '登录',isShow:true,tttt:'没有该账号!请到注册页面注册账号'})
		}else{
			if(md5(req.body.psw)==result[0].psw){
				console.log(1);
				req.session.yzt = result[0];
				res.cookie("username",result[0].name);
				res.redirect("/");
			}else{
				console.log(2);
				res.render('login',{title: '登录',isShow:true,tttt:'密码错误'})
			}
		}
	})
})

module.exports = router;