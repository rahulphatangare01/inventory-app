var jwt = require('jsonwebtoken');
const JWT_SECRET = 'S&&scM_b%$#Wram';
const authuser = (req,res,next)=> {
    const token =req.header('Authorization');
    if(!token){
        return res.status(401).json({sucess:false,message:'autuanticate valid token'})
    }
    try {
        const data= jwt.verify(token, JWT_SECRET)
        req.user = data.user
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).json({sucess:false,message:'plase authanticate using valid token'})
    }
}

module.exports = authuser;