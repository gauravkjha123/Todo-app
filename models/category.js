const mongoose = require('mongoose');
const categorySchema=mongoose.Schema({
    name:{
        type:String,
        require:true,
        enum:['Personal','Work','School','Cleaning','Other'],
        default:'Other'
    },
    color:{
        type:String,
        require:true,
    }
    
},  {
    timestamps: true
  }
)

module.exports.category=mongoose.model('category',categorySchema);