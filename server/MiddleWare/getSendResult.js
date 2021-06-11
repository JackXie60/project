exports.getErr = function(errcode=500,err){
    return {
        code:errcode,
        err:err,
    }
}
exports.getResult = function(result){
    return {
        code:0,
        msg:"",
        data:result
    }
}
exports.asyncHandler = function (handler){
    return async function(req,res,next){
        try{
            const result = await handler(req,res,next);
            res.send(exports.getResult(result));
        }catch(err){
            next(err);
        }
    }
}