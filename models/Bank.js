const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema({

    bankName: {
        type: String,
        trim: true,
        required: [true, "Please input Bank Name!"]
    },
    accountNumber: {
        type: String,
        required: [true, "Please input Account Number!"]
    },
    accountHolder: {
        type: String,
        required: [true, "Please input Account Holder!"]
    },
    imageUrl: {
        type: String,
        required: true,
    },

})

module.exports = mongoose.model("Bank", bankSchema)