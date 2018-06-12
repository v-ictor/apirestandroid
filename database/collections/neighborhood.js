const mongoose = require("../connect");
const Schema = require("mongoose").Schema;
var neighborhoodSchema = {
    departament : String,
    name : String,
    zoom : Number,
    lat : String,
    lng : String,
    coordenadas : [{type : Schema.ObjectId,ref : "coordenadas"}]
};
var neighborhood = mongoose.model("neighborhood", neighborhoodSchema);
module.exports = neighborhood;