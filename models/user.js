const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const autoIncrement = require('mongoose-sequence')(mongoose)

const modelSchema = mongoose.Schema(
    {
        _id : Number,
        name : {
            type : String
        },
        email : {
            type : String,
            required : true,
            unique : true,
            match : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        },
        password : {
            type : String,
            required : true
        }
    },
    {
        timestamps : true
    }
)

modelSchema.pre('save', async function(next){

    const salt = await bcrypt.genSalt(10)

    const passwordHash = await bcrypt.hash(this.password, salt)

    this.password = passwordHash;

    next();
})

modelSchema.methods.comparePassword = function(isInputPassword, cb){

    bcrypt.compare(isInputPassword, this.password, (err, isMatch) => {

        if(err) return cb(null, err)

        cb(null, isMatch)
    })
}

modelSchema.plugin(autoIncrement, {id: 'user_id_counter', inc_field: '_id'})

module.exports = mongoose.model('user', modelSchema)