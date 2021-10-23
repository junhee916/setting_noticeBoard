const boardModel = require('../models/board')
const boardDBO = {}

boardDBO.list = (req, res) => {

    const result = {status : 'success', boardData : []}

    try{

        boardModel.find().exec(function(err, boards){
            
            if(err){
                console.log(err)
            }
            else{

                for(board of boards){

                    const temp = {

                        board : board["board"]
                    }

                    result["boardData"].push(temp)
                }

                res.status(201).send({board : result})
            }
        })

    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};

boardDBO.detailList = async (req, res) => {

    const id = req.params.boardId

    try{
        const board = await boardModel.findById(id)

        if(!board){
            return res.status(402).json({
                msg : "no boardId"
            })
        }
        else{
            res.status(200).json({
                msg : "get board",
                boardInfo : {
                    id : board._id,
                    user : board.user,
                    board : board.board
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

boardDBO.register = async (req, res) => {

    const newBoard = new boardModel(req.body)
    
    try{

        const board = await newBoard.save()

        if(board){
            res.render('../views/index')
        }

    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};

boardDBO.update = async (req, res) => {

    const id = req.params.boardId

    const updateOps = {}

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    }

    try{
        const board = await boardModel.findByIdAndUpdate(id, {$set : updateOps})

        if(!board){
            return res.status(402).json({
                msg : "no boardId"
            })
        }
        else{
            res.status(200).json({
                msg : "update board by id: " + id
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};

boardDBO.delete = async (req, res) => {

    try{
        await boardModel.remove()

        res.status(200).json({
            msg : "delete boards"
        })
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};

boardDBO.detailDelete = async (req, res) => {

    const id = req.params.boardId

    try{
        const board = await boardModel.findByIdAndRemove(id)

        if(!board){
            return res.status(402).json({
                msg : "no boardId"
            })
        }
        else{
            res.status(200).json({
                msg : "delete board by id: " + id
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};

module.exports = boardDBO