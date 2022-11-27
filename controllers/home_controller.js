
const Post = require("../models/post");
const Job = require("../models/job");

const User = require("../models/user");
const Company = require("../models/company");
module.exports.home=async function(req,res){
   
  
        if(!(req.user))
        {
            return res.render('home',{title:'Get Hired|Home'});
        }
        if(req.user.isuser==false)
        {
            let company=await Company.find({});
            return res.render('home',{
                title: "GetHired|Home",
                all_company: company
        });
        }
        let company=await Company.find({});
        let arr=[];
        for(j of req.user.subs)
        {
            let jobs= await Job.find({company:j}).populate('company').populate('applicants').exec();
            for(a of jobs)
            arr.push(a);
            
        }
        arr.sort((a, b) => (a.dateposted > b.dateposted) ? -1 : 1 );
        let rjobs = await Job.find({skills:req.user.interest}).populate('company').populate('applicants').exec();
        rjobs.sort((a, b) => (a.dateposted > b.dateposted) ? -1 : 1 );
        return res.render('home',{
            title: "GetHired|Home",
            jobs: arr,
            recomdedJobs: rjobs,
            all_company: company
    });

        //     User.find({},function(err,users){
                    
        //             Job.find({})
        //             .populate('company')
        //             .exec(function(err, jobs){
        //                 Company.find({}, function(err, company){
        //                     return res.render('home',{
        //                         title: "GetHired|Home",
        //                         jobs: jobs,
        //                         all_users: users,
        //                         all_company: company
        //                 });
        //                 });
                        
                    
        //     });
            
        // });

    
    
}