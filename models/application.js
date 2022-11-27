const mongoose=require('mongoose');

const applicationSchema=new mongoose.Schema({

    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },    
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }
},{
    timestamps:true
});

const Application = mongoose.model('Application',applicationSchema);
module.exports=Application;