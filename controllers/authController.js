
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.login = async (req,res) => {
    try{
        const {username , password} = req.body;

        if (!username || !password){
            return res.status(400).json({
                status:'fail',
                message : 'Please provide a username and password.',
            });
        }

        const user = await User.findOne({username}).select('+password');

        if (!user || !(await user.comparePassword(password))){
            return res.status(401).json({
                status:'fail',
                message:'Invalid credentials',
            });
        }

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN || '3d'}
        );

        return res.status(200).json({
            status:'success',
            _id : user._id,
            username: user.username,
            token,
        });
        // const payload = {id:user._id};

        // const token = jwt.sign(payload, process.env.JWT_SECRET , {
        //     expiresIn: process.env.JWT_EXPIRES_IN,
        // });

    }catch(error){
        console.error('Login Error:',error);
        res.status(500).json({
            status: 'error',
            message: 'An internal server error occurred.'
        });
    }
};