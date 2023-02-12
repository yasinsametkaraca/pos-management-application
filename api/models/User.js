const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        username: {type: String, require: true},
        email: {type: String, require: true,unique: true},
        password: {type: String, require: true}
    },
    {timestamps: true},
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.password;
            },
        },
    },
);

const User = mongoose.model("users",UserSchema);
module.exports = User;