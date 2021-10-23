const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const userDBO = {}

userDBO.list = async (req, res) => {

    try{
        const users = await userModel.find()

        res.status(200).json({
            msg : "get users",
            count : users.length,
            userInfo : users.map(user => {
                return {
                    id : user._id,
                    name : user.name,
                    email : user.email,
                    password : user.password
                }
            })
        })
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};

userDBO.detailList = async (req, res) => {

    const id = req.params.userId

    try{
        const user = await userModel.findById(id)

        if(!user){
            return res.status(401).json({
                msg : "no userId"
            })
        }
        else{
            res.status(200).json({
                msg : "get user",
                userInfo : {
                    id : user._id,
                    name : user.name,
                    email : user.email,
                    password : user.password
                }
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};

userDBO.signup = async (req, res) => {

    const { name, email, password } = req.body

    try{
        const user = await userModel.findOne({email})

        if(user){
            return res.status(400).json({
                msg : "user email, please other email"
            })
        }
        else{
            const user = new userModel({
                name, email, password
            })

            await user.save()

            res.status(200).json({
                msg : "success signup",
                userInfo : {
                    id : user._id,
                    name : user.name,
                    email : user.email,
                    password : user.password
                }
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};

userDBO.login = async (req, res) => {

    const { email, password } = req.body

    try{
        const user = await userModel.findOne({email})

        if(!user){
            return res.status(400).json({
                msg : "user email, please other email"
            })
        }
        else{
            
            await user.comparePassword(password, (err, isMatch) => {

                if(err || !isMatch){
                    return res.status(401).json({
                        msg : "not match password"
                    })
                }
                else{

                    const payload = {
                        email : user.email
                    }

                    const token = jwt.sign(
                        payload,
                        process.env.SECRET_KEY,
                        {expiresIn : '1h'}
                    )
                    
                    res.status(200).json({
                        msg : "success login",
                        tokenInfo : token
                    })
                }
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};

userDBO.update = async (req, res) => {

    const id = req.params.userId

    const updateOps = {}

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    }

    try{
        const user = await userModel.findByIdAndUpdate(id, {$set : updateOps})

        if(!user){
            return res.status(402).json({
                msg : "no userId"
            })
        }
        else{
            res.status(200).json({
                msg : "update user by id: " + id
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};

userDBO.delete = async (req, res) => {

    try{
        await userModel.remove()

        res.status(200).json({
            msg : "delete users"
        })
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};

userDBO.detailDelete = async (req, res) => {

    const id = req.params.userId

    try{
        const user = await userModel.findByIdAndRemove(id)

        if(!user){
            return res.status(402).json({
                msg : "no userId"
            })
        }
        else{
            res.status(200).json({
                msg : "delete user by id: " + id
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};

module.exports = userDBO