const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

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
    },
    passwordChangedAt: Date,
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    passwordResetToken:String,
    passwordResetExpire:Date,
});

DataSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    this.passwordChangedAt = Date.now()-1000;
    next();
});

DataSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};


DataSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.passwordResetExpire = Date.now()+10*60*1000;

    return resetToken;
}


const userAccount = mongoose.model('userAccount',DataSchema);

module.exports = userAccount;