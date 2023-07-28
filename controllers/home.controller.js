const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId
const { TaskModel } = require("../models/task");


const showTask=async function  (req,res){
    let data=await TaskModel.find();
    res.render('home',{data})
}

const createTask=async function  (req,res){
    try {
        let {name,date,category}=req.body;
        let obj={};
        if (!name) {
            throw Error("Task name is required")
        }
        obj.name=name;
        obj.category=category
        if (date) {
            obj.date=new Date(date);
        }
        let task=new TaskModel(obj);
        await task.save();
       return res.redirect('/')
    } catch (error) {
        console.error('Error deleting documents:', error);
        return res.status(500).render('error', { message: 'Internal server error' });
    }
}

const deleteTask = async function (req, res) {
    try {
      let { ids } = req.body;
      if (ids && Array.isArray(ids)) {

        const objectIdsToDelete = ids.map((id) => new ObjectId(id));
  
        await TaskModel.deleteMany({ _id: { $in: objectIdsToDelete } });
  
      }
    return res.status(200).json({status:true,message:"delete succefully"});
    
    } catch (error) {
      console.error('Error deleting documents:', error);
      return res.status(500).render('error', { message: 'Internal server error' });
    }
  };

  
module.exports={showTask,createTask,deleteTask};