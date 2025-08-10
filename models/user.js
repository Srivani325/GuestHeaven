const mogoose = require("mongoose");
const Schema = mogoose.Schema;
const PassportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type : String,
        required : true,
    }
});

userSchema.plugin(PassportLocalMongoose);

module.exports= mogoose.model("User", userSchema);