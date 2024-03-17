const jwt = require("jsonwebtoken")
const errorHanler = require("../error/errorHandler")
const { CatchAsyncErrors } = require("./CatchAsyncerror");
// const { token } = require("morgan");






exports.isAuthenticated = CatchAsyncErrors(async (req,res,next)=>{
    
   const {studentToken} = req.cookies
    if(!studentToken){
        return next(
            new errorHanler("Please login to access",401)
        )
    }
    const { id } = jwt.verify(studentToken,process.env.JWT_SECRET);
    req.id = id
    
    next();
})

exports.isAuthenticatedEmploye = CatchAsyncErrors(async (req,res,next)=>{
   const {employeToken} = req.cookies
    if(!employeToken){
        return next(
            new errorHanler("Employe Please login to access",401)
        )
    }
    console.log(req);
    const { id } = jwt.verify(employeToken,process.env.JWT_SECRET);
    req.id = id
    
    next();
})