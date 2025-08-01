const asyncHandler = (requestHandler) =>{
    (req,res,next) =>{
        Promise.resolve(requestHandler(req,res,next)).
        catch((err) => next(err))
    }
}

export {asyncHandler}

/*
const asyncHandlerpartTwo = (requestHandler) = async(req,res,next) =>{
    try {
        await requestHandler(req,res,next)
    } catch (error) {
        res.status(err.status || 500).json({
            success : false,
            message : err.message
        })
    }
} 
    we can do the above thing in this way also.
*/