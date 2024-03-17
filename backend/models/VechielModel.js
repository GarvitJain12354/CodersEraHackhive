const { default: mongoose } = require("mongoose");

const vichelModel = new mongoose.Schema({
    deviceId:String,
    data:{
        type:Array,
        default:[]
    }
})

const Vichel = new mongoose.model("Vichel",vichelModel);
module.exports = Vichel