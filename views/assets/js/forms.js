class Forms {
    constructor() {
        //  Set default error message.
        this.error = 'Sorry, an error ocurred, please try again later.';

        //  Hide the message box by default.
        $("#msg").hide();

        //  Save this is constant as this is not defined as
        //  Forms class inside event callback functions.
        const form = this;

        // Add eventlisteners to call class functions here.
        $('#regForm').submit(function(event) {
            event.preventDefault();
            form.register($('#regForm').serializeArray());
        });

        $('#loginForm').submit(function(event) {
            event.preventDefault();
            form.login($('#loginForm').serializeArray());
        });

        $('#logout').submit(function(event) {
            event.preventDefault();
            form.logout();
        });

        $('#updateForm').submit(function(event) {
            event.preventDefault();
            form.update($('#updateForm').serializeArray());
        });

        $('#deleteForm').submit(function(event) {
            event.preventDefault();
            form.delete($('#deleteForm').serializeArray());
        });
    }

    register (form) {
        let data = {};
        for (let input of form) {
            data[input.name] = input.value;
        }
        const forms = this;
        if (data.password === data.confPass) {
            delete data.confPass;
            forms.validate(data, (error, result) => {
                if (!error) {
                    forms.ajaxPost('/register', result, (error, result) => {
                        if (!error) {
                            if (result.status) {
                                forms.showMessage('#regForm', 'alert-success', 'Success!', result.message, true);
                            } else {
                                forms.showMessage('#regForm', 'alert-info', data.username + ':', result.message);
                            }
                        } else {
                            forms.showMessage('#regForm', 'alert-danger', 'Error!', error.message);
                        }
                    });
                } else {
                    forms.showMessage('#regForm', 'alert-warning', 'Invalid:', error.message);
                }
            });
        } else {
            forms.showMessage('#regForm', 'alert-warning', 'Invalid:', 'Lösenorden matchar inte.');
        }
    }

    //  TODO: Show logout button.
    login (form) {
        let data = {};
        for (let input of form) {
            data[input.name] = input.value;
        }
        const forms = this;
        forms.validate(data, (error, result) => {
            if (!error) {
                forms.ajaxPost('/login', result, (error, result) => {
                    if (!error) {
                        if (result.status) {
                            forms.showMessage('#loginForm', 'alert-success', '', result.message, true);
                        } else {
                            forms.showMessage('#loginForm', 'alert-warning', data.username + ':', result.message, true);
                        }
                    } else {
                        forms.showMessage('#loginForm', 'alert-danger', 'Error!', error.message);
                    }
                });
            } else {
                forms.showMessage('#loginForm', 'alert-warning', 'Ogiltigt:', error.message);
            }
        });
    }

    logout () {

    }

    update (form) {

    }

    delete (form) {

    }

    validate (data, callback) {
        let aproved = true;
        for (let val in data) {
            if (!/^[a-öA-Ö0-9]+$/.test(data[val])) {
                callback('Användarnamn och lösenord får bara innehålla A-Z, a-z och 0-9.', null);
                aproved = false;
                break;
            }
            if (data[val].length <= 6) {
                aproved = false;
                callback('användarnamn och lösenord måste vara minst 6 karaktärer långa.', null);
                break;
            }
        }
        if (aproved) {
            callback(null, data);
        }
    }

    showMessage (formId, type, title, text, clear = false) {
        const msg = $(`${formId} > #msg`);
        msg.text('');
        msg.removeClass();
        msg.show();
        msg.addClass('alert');
        msg.addClass(type);
        msg.append(`<strong>${title}</strong> ${text}`);
        setTimeout(function() {
            msg.hide();
            msg.text('');
            msg.removeClass();
        }, 15000);
        if (clear) {
            $(`${formId}`).trigger("reset");
        }
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
                console.error(ajaxOptions);
                console.error(thrownError);
                //  Then return error true through the callback.
                callback(true, null);
            }
        });
    }

}

$(document).ready(function () {const forms = new Forms();});
