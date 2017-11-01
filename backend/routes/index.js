var express = require('express');
var router = express.Router();
var Article = require('../model/article');

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.cookies["username"]){
		console.log(req.cookies["username"]);
		Article.find({
			user:req.cookies["username"]
		}).then(result=>{
			res.render('index', { title: 'Frog管理系统',username:req.cookies["username"],list:result});
		})
		
	}else{
		res.redirect("/login");
	}
});

//退出登录
router.get("/logout",function(req,res){
	console.log(1);
	res.clearCookie('username');
	(function(){
	res.redirect("/login");
	})();
	
});

module.exports = router;
