const category=require("../../models/category").category;
module.exports=async function  (req,res){
    let output=await category.find()
    res.send(output)
}