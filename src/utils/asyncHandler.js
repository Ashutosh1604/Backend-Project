const asyncHandler=(fn)=>async (freq,res,next)=>{
    try{
        await fn(req,res,next)

    }
    catch(error){
       res.status(err.code || 500).json({
        success:false,
        message:error.message
       })
    }
}

export {asyncHandler}