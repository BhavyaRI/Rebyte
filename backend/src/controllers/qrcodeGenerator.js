const qrcode = require('qrcode');

const url = "https://www.google.com";

const generateqr = async (req,res) => {
    try {
        const {originalURL} = req.body;
        
        qrcode.toFile('qr.png',originalURL,(err)=>{
            if(err) throw err;
            console.log('QR code saved to png');
        });

        return res.status(200).json({
            status:'success',
        });
    } catch (error) {
        return res.status(400).json({
            status:"failed",
            message:error.message,
        });
    }
    
};

module.exports={generateqr}