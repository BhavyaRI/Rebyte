const userAccount = require('../models/userAccount');
const jwt = require('jsonwebtoken');

const signin = async (req ,res)=>{
    try {
        const newAcc = await userAccount.create({
            email:req.body.email,
            password:req.body.password,
            passwordConfirm: req.body.passwordConfirm
        });

        const token = jwt.sign({id:newAcc._id},process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXPIRES_IN}
        );

        return res.status(200).json({
            status:"Success",
            token,
            data:{
                user:newAcc,  
            },
        });
    } catch (error) {
        return res.status(400).json({
            status:"Failed",
            message:error.message,
        });
    }
};

const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                status:"Failed",
                message:error.message,
            });
        }

        const user = await userAccount.findOne({email}).select('+password');

        if(!user || !(await(user.correctPassword(password,user.password)))){
            return res.status(400).json({
                status:"failed",
                message:"Incorrect username or password",
            });
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:process.env.JWT_EXPIRES_IN
        });

        return res.status(200).json({
            status:'success',
            token,
        });

    }
    catch(error){
        return res.status(400).json({
            status:'Failed',
            message:error.message,
        });
    }
};

module.exports = {
    signin,
    login,
};