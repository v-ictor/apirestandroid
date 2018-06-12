const mongoose = require("../connect");
const Schema = require("mongoose").Schema;
var imagesSchema = {
    medium : String,
    medium_height : Number,
    medium_width : Number,
    small : String,
    small_height : Number,
    small_width : Number,
    height_100 : String,
    height_100_height : Number,
    height_100_width : Number,
    height_300 : String,
    height_300_height : Number,
    height_300_width : Number,
    width_400 : String,
    width_400_height : Number,
    width_400_width : Number,
    real : String,
    real_height : Number,
    real_width : Number,
    idpro : {type : Schema.ObjectId,ref : "properity"}
};
var images = mongoose.model("images", imagesSchema);
module.exports = images;