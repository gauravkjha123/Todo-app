const { TaskModel } = require("../../models/task");
module.exports.home=async function  (req,res){
    res.render('home')
}

module.exports.create=async function  (req,res){
    let data=req.body;
    let task=new TaskModel(data);
    await task.save();
    res.render('home')
}