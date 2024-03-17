const { CatchAsyncErrors } = require("../middlewares/CatchAsyncerror");

exports. sendToken = (student,statusCode,res)=>{
    const token = student.getjwttoken();
    
    
    res.status(statusCode).cookie("studentToken",token,options)
    .json({success:true,id:student._id,token});
    res.json({token})
}

exports. sendEmployeToken = (employe,statusCode,res)=>{
    const token = employe.getjwttoken();
    const options = {
        expires :new Date(Date.now() + 1*24*60*60*1000),
        httpOnly:true
    }
    res.status(statusCode).cookie("employeToken",token,options)
    .json({success:true,id:employe._id,token});
    res.json({token})
}