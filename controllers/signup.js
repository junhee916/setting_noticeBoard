const signupBtn = document.getElementById("signupBtn")

signupBtn.addEventListener("click", function(){

    const name = $("#name").val()

    const email = $("#email").val()

    const password = $("#password").val()

    $.ajax({

        type : "POST",
        url : "/user/signup",
        data : {
            name : name,
            email : email,
            password : password
        },
        success : function(response){

            window.location.href = "/login"
        }
    })
})