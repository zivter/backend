var express = require('express');
var router = express.Router();
var Article = require('../model/article');

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.cookies["username"]) {
        Article.find({
            user: req.cookies["username"]
        }).then(result => {
            res.render('article', { title: '增加商品', root: '增加商品', username: req.cookies["username"], list: result, fix: false });
        })

    } else {
        res.redirect("/login");
    }
});

//退出登录
router.get("/logout", function(req, res) {
    res.clearCookie('username');
    (function() {
        res.redirect("/login");
    })();

});

//添加商品
router.get("/submit", function(req, res) {
    var date = new Date();
    console.log(date.getFullYear());
    console.log(date.getMonth());
    console.log(date.getDate());
    var dat = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
    console.log(dat);
    return Article.create({
        user: req.cookies["username"],
        tittle: req.query.tittle,
        main: req.query.main,
        path: req.query.path,
        amout: req.query.amout,
        date: dat
    }).then(result => {
        res.redirect("/");
    })
})

//修改商品
router.get("/change", function(req, res) {
        Article.find({
            _id: req.query.id
        }).then(result => {
            res.render('article', { title: '修改商品', root: '修改商品', username: req.cookies["username"], result: result, fix: true });
        })

    })
    //修改商品
router.get("/fix", function(req, res) {
    Article.findByIdAndUpdate(req.query.id, {
        $set: {
            tittle: req.query.tittle,
            main: req.query.main,
            path: req.query.path
        }
    }).then(result => {
        res.redirect("/");
        //res.render('article', { title: '修改商品',root:'修改商品',username:req.cookies["username"],result:result,fix:false});
    })

})

//删除商品
router.get("/delete", function(req, res) {
    console.log(req.query.id);
    Article.remove({
        _id: req.query.id
    }).then(result => {
        res.redirect("/");
    })

})



module.exports = router;