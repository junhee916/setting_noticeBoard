const addBoardBtn = document.getElementById('addBoardBtn')

// save
addBoardBtn.addEventListener("click", function(){

    const board = $("#board").val()

    const user = 'junhee916'

    $.ajax({

        type : "POST",
        url : "/board/save",
        data : {
            user : user,
            board : board
        },
        success : function(response){

            window.location.href = "/index"
        }
    })
})

$(document).ready(function(){

    $("#boardView").empty()
    boardView()
})

function boardView(){

    $.ajax({

        type : "GET",
        url : "/board",
        success : function(response){

            const board = response["board"]["boardData"]

            for(let i = 0; i<board.length; i++){

                const htmlTemp = 
                `
                <div class="board_write_append">
                    <div class="board_board_id_pointer" onclick="window.location.href='/board/detail/${board[i]["id"]}'">${board[i]["id"]}</div>
                    <div>${board[i]["board"]}</div>
                </div>

                `

                $("#boardView").append(htmlTemp)
            }
        }
    })
}
