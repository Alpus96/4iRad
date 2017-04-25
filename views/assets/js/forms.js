const Forms = new Forms();

class Forms {
    constructor() {
        //  Set default error message.
        this.error = 'Sorry, an error ocurred, please try again later.';

        // Add eventlisteners to call class functions here.
    }

    //  Add form handlers here.

    /*
    *   A function to send ajax requests with json data to the server.
    *
    *   @params     url: '/example', a string containing the url where to send the post request.
    *                         data: {username: "", password: ""}, an object containing
    *                         the information to send to the server.
    *                         callback: (error, result) => {...}, a function to call when done.
    * */
    ajaxPost (url, data, callback) {
        //  Ajax json post request.
        $.ajax({
            url: url,   //  Pass the input url parameter.
            type: "POST",
            data: data, //  Pass the input data parameter.
            dataType: "json",
            success: function (result) {
                //  Returns the result as result through the callback function.
                callback(null, result);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //  If there was an error log it.
                console.error(xhr.status);
                console.error(thrownError);
                //  Then return error true through the callback.
                callback(true, null);
            }
        });
    }

}
