const jwt = require('jsonwebtoken')
const userModel = require('../models/user')

module.exports = (req, res, next) => {

    try{
        const token = req.headers.authorization.split(' ')[1]

        jwt.verify(token, process.env.SECRET_KEY, (err, data) => {

            if(err){
                res.status(403).json({
                    msg : err.message
                })
            }
            else{
                
                userModel.findById(data, {_id : true, name: true, email: true}).exec()
                .then((user) => {
                    console.log(user)
                    res.locals.user = user;
                    next();
                })
            }
        })


    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
}