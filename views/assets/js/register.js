/*
*   A function to send register user request with json data to server.
*
*   @params     data: {username: "", password: ""}, an object containing
*                         the username and password for the new user.
* */
function registerUser(data) {
    //  Ajax json post request.
    $.ajax({
        url: "/register",
        type: "POST",
        data: data, //  Pass the input data parameter.
        dataType: "json",
        success: function (result) {
            console.log(result);
            /*
            * Handle result here.
            *
            *   result is an object:
            *   {
            *       status: true/false,
            *       message: "message string"
            *   }
            * */
        },
        error: function (xhr, ajaxOptions, thrownError) {
            //  If there was an error handle it here.
            console.error(xhr.status);
            console.error(thrownError);
        }
    });
}
