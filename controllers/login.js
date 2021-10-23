const loginBtn = document.getElementById("loginBtn")

loginBtn.addEventListener("click", function(){

    const email = $("#email").val()

    const password = $("#password").val()

    $.ajax({

        type : "POST",
        url : "/user/login",
        data : {
            email : email,
            password : password
        },
        success : function(response){

            window.location.href = "/index"
        }
    })
})