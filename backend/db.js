var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/proj');
var db = mongoose.connection

db.on('error', console.error.bind(console, '连接错误:'));
db.once('open', function() {
    console.log('连接成功');
})