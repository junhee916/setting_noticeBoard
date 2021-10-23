const mongoose = require('mongoose')
const autoIncrement = require('mongoose-sequence')(mongoose)

const modelSchema = mongoose.Schema(
    {
        _id : Number,
        user : {
            type : String,
            required : true
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

modelSchema.plugin(autoIncrement, {id: 'commend_id_counter', inc_field: '_id'})

module.exports = mongoose.model('commend', modelSchema)