const mongoose = require('mongoose');
const taskSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    date:{ 
        type: Date,
        require:false
    },
    category:{
        type:String,
        require:false
    }
})

module.exports.TaskModel=mongoose.model("task",taskSchema);