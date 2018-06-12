const mongoose = require("../connect");
const Schema = require("mongoose").Schema;
var coordenadasSchema = {
    lat : String,
    lng : String,
    neighborhood : {type : Schema.ObjectId,ref : "neighborhood"}
};
var coordenadas = mongoose.model("coordenadas", coordenadasSchema);
module.exports = coordenadas;