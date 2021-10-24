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

                        id : board["_id"],
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


boardDBO.detailList = (req, res) => {

    const id = req.params.boardId

    try{
        boardModel.findById(id).exec(function(err, board){

            if(err){
                console.log(err)
            }
            else{

                /*
                * 현재 데이터를 불러올 수는 있으나 ajax으로 따로 
                보내는 방법이 미흡함 -> ejs로 바로 데이터를 보낸 다음에 
                다시 구현할 예정 
                */
                // const result = {
                //     id : board._id,
                //     board : board.board
                // }

                // res.status(201).send({board : result})

                res.render('../views/show', {board : board})

            }
        })

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

    try{
        const board = await boardModel.findByIdAndUpdate(id, {$set : {

            board : req.body.board
        }})

        if(!board){
            return res.status(402).json({
                msg : "no boardId"
            })
        }
        else{
            res.render('../views/show')
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