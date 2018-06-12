const mongoose = require("../connect");
const Schema = require("mongoose").Schema;
var videoSchema = {
    url : String,
    key : String,
    poster : String,
    title : String,
    idpro : {type : Schema.ObjectId,ref : "properity"}
};
var video = mongoose.model("video", videoSchema);
module.exports = video;