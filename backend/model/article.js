var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var obj = {
    user: String,
    tittle: String,
    main: String,
    path: String,
    amout: String,
    date: String
};

var model = mongoose.model("article", new Schema(obj));

module.exports = model;