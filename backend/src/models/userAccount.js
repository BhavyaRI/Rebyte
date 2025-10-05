const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const DataSchema = new mongoose.Schema({
    email:{
        type:String,
        required :true,
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Please provide a valid email id'],   
    },
    password:{
        type:String,
        required:[true,'Please provide password'],
        minlength:[8,'The password should be of min 8 characters'],
        select:false,
    },
    passwordConfirm:{
        type:String,
        required:[true,'Please confirm password'],
        validate:{
            validator:function(el){
                return el===this.password;
            },
            message:'Password does not match'
        }
    }
});

DataSchema.pre('save',async function(next){
    if(!(this.isModified('password'))){
        return next;
    }
    try {
        const salt = bcrypt.genSalt(12);
        const hash = bcrypt.hash(this.password,salt);
        this.password = hash;
        this.passwordConfirm = undefined;
        next();
    } catch (error) {
        return next(err);        
    }
});

DataSchema.method.correctPassword = async function(loginpassword,userpassword){
    return bcrypt.compare(loginpassword,userpassword);
}

const userAccount = mongoose.model('userAccount',DataSchema);

module.exports = userAccount;