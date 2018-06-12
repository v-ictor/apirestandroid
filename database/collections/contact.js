const mongoose = require("../connect");
var contactSchema = {
    name : String,
    lastname : String,
    phone : String,
    phoneFiltered : String,
    phoneFilteredComplete : String,
    movil : String,
    movilFiltered : String,
    email : String,
    city : String,
    photo : String,
    phoneFirst4Digits : String
};
var contact = mongoose.model("contact", contactSchema);
module.exports = contact;
