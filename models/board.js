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
            type : String,
            required : true
        }
    },
    {
        timestamps : true
    }
)

modelSchema.plugin(autoIncrement, {id: 'board_id_counter', inc_field: '_id'})

module.exports = mongoose.model('board', modelSchema)