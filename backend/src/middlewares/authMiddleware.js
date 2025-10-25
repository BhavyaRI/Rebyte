const jwt = require('jsonwebtoken');
const userAccount = require('../models/userAccount');

const protect = async (req, res, next) => {
    try {
        let token;
        // 1)Getting token 
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        console.log(token);
        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }
        // 2)Verification of token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //3)Check if user exists
        const crtUser = await userAccount.findById(decoded.id).select('-password');
        if(!crtUser){
            return res.status(401).json({message:"User doesn't exist "});
        }

        // 4)Check if passsword change after token
        if(crtUser.passwordChangedAt){
            const changetime = parseInt(crtUser.passwordChangedAt.getTime()/1000,10);
            if(changetime > decoded.iat){
                return res.status(401).json({message:'Please relogin with new password'});
            }
        }

        req.user = crtUser;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const restrictsTo = (...roles)=>{
    return (res,req,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message:'No authorized to perform this action'});
        }
        next();
    };
};

module.exports = { protect,restrictsTo};