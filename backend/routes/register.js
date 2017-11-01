var express = require('express');
var router = express.Router();
var User = require("../model/user");
var md5 = require("md5");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('register', { title: '注册',isShow:false});
});
router.post('/',function(req,res){
	console.log(req.body);
	User.find({
		email:req.body.email
	}).then(result=>{
		console.log(result);
		if(result.length==0){
			console.log(1111231312312);
			return User.create({
				name:req.body.name,
				email:req.body.email,
				psw:md5(req.body.psw)
			})
		}else{
			res.render('register', {title: '注册',isShow:true});
		}
	}).then(result=>{
		res.redirect("/login");
	})
})

module.exports = router;
