const mongoose = require('mongoose')

const modelSchema = mongoose.Schema(
    {
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user'
        },
        board : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'board',
            required : true
        },
        commend : {
            type : String,
            required : true
        }
    },
    {
        timestamps : true
    }
)

module.exports = mongoose.model('commend', modelSchema)