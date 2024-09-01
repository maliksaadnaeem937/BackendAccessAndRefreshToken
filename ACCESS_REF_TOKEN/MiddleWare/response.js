

const responseMiddleWare=(status,data,message,res)=>{

    return res.status(status).json({
        response_data:data,
        message
    })

}
export default responseMiddleWare;