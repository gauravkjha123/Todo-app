const mongoose = require('mongoose');
const contactSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    date:{ 
        type: Date,
        require:false
    },
    category:{
        type: mongoose.Schema.ObjectId,
        require:false
    }
})

module.exports.TaskModel=mongoose.model("task",contactSchema);