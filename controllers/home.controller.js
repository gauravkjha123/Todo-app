const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId
const { TaskModel } = require("../models/task");


const showTask=async function  (req,res){
    let data=await TaskModel.find();
    res.render('home',{data})
}

const createTask = async function (req, res) {
  try {
      const { name, date, category } = req.body;

      if (!name) {
          throw new Error("Task name is required");
      }

      const taskData = {
          name,
          category,
          date: date ? new Date(date) : undefined,
      };

      const task = new TaskModel(taskData);
      await task.save();
      return res.redirect('/');
  } catch (error) {
      console.error('Error creating task:', error);
      return res.redirect('/');;
  }
};
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
      return res.redirect('/');
    }
  };

  
module.exports={showTask,createTask,deleteTask};