class Forms {
    constructor() {
        //  Set default error message.
        this.error = 'Ett fel upstod, vänligen försök igen senare.';

        this.update();
        
        //  Hide the message boxes by default.
        $("#regForm-msg").hide();
        $("#loginForm-msg").hide();
        $("#logout-msg").hide();

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

        $('#logout').on('click', function(event) {
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
                                forms.showMessage('regForm', 'alert-success', 'Success!', result.message, true);
                            } else {
                                forms.showMessage('regForm', 'alert-info', data.username + ':', result.message);
                            }
                        } else {
                            forms.showMessage('regForm', 'alert-danger', 'Error!', error.message);
                        }
                    });
                } else {
                    forms.showMessage('regForm', 'alert-warning', 'Invalid:', error.message);
                }
            });
        } else {
            forms.showMessage('regForm', 'alert-warning', 'Invalid:', 'Lösenorden matchar inte.');
        }
    }

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
                            forms.showMessage('loginForm', 'alert-success', '', result.message, true);
                            forms.createCookie('loggedIn', true, 10);
                            $('#logout').show();
                        } else {
                            forms.showMessage('loginForm', 'alert-warning', data.username + ':', result.message, true);
                        }
                    } else {
                        forms.showMessage('loginForm', 'alert-danger', 'Error!', error.message);
                    }
                });
            } else {
                forms.showMessage('loginForm', 'alert-warning', 'Ogiltigt:', error.message);
            }
        });
    }

    logout () {
        const forms = this;
        this.ajaxPost('/logout', {}, (error, result) => {
            if (!error) {
                if (result.status) {
                    forms.deleteCookie('loggedIn');
                    forms.showMessage('logout', 'alert-success', '', result.message);
                } else {
                    forms.showMessage('#logout', 'alert-warning', 'Varning!', result.message);
                }
            } else {
                forms.showMessage('#logout', 'alert-danger', 'Error!', forms.error);
            }
        });
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
        const msg = $(`#${formId}-msg`);
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
        }, 10000);
        if (clear) {
            $(`#${formId}`).trigger("reset");
        }
    }

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

    //  Cookie handlers here.

    createCookie (name, value, mins) {
        var expires;
        if (mins) {
            var date = new Date();
            date.setTime(date.getTime() + (mins * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    readCookie(name,c,C,i){
        if(this.cookies){ return this.cookies[name]; }

        c = document.cookie.split('; ');
        this.cookies = {};

        for(i=c.length-1; i>=0; i--){
           C = c[i].split('=');
           this.cookies[C[0]] = C[1];
        }

        return this.cookies[name];
    }

    update () {
        this.readCookie();
        if (!this.readCookie('loggedIn')) {
            $('#logout').hide();
        }
    }

    deleteCookie (name) {
        this.createCookie(name, '', -1);
        this.update();
    }

}

$(document).ready(function () {const forms = new Forms();});
