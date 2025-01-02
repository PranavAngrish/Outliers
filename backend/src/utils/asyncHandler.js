



const catchAsync = (requestHandler) => {
    return (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err)=> next(err))
    }
}


// const asyncHandler = (func) => (req,res,next) => {
//     try{

//     }catch(error){
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message

//         })
//     }
// }

export {catchAsync}