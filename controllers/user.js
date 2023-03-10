import Users from '../models/Users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {createError} from '../utils/error.js'


let sshkey = "W16aQUoCDwHm8AAAAadWpqYWx6YW1hbkBERVNLVE9QLUlLNkVITkUB";

export const register = async (req, res, next)=>{
    const salt =  bcrypt.genSaltSync(10);
    const hash =  bcrypt.hashSync(req.body.password, salt);

    try{
        const userData = new Users({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })
        const newUser = await userData.save();
        res.status(200).json(newUser);
    }catch(err){
        next(err);
    }
}
export const login = async(req, res, next) =>{

    try{
        const user = await Users.findOne({email: req.body.email});
        if(!user){
            return next(createError(404, 'User not Found'));
        } 

        const isPassword = await bcrypt.compare(req.body.password, user.password);
        if(!isPassword) {
            return next(createError(404, 'Password is not matched!'));
        }

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, sshkey);
        const {password, isAdmin, ...others} = user._doc;
        res.cookie('access_token', token, {
            httpOnly: true
        })
        .status(200)
        .json({details: {...others}, isAdmin});
    }
    catch(err){
        next(err)
    }
}