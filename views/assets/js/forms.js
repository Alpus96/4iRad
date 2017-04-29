class Forms {
    constructor() {
        //  Set default error message.
        this.error = 'Ett fel upstod, vänligen försök igen senare.';

        this.cookie = new Cookies();

        this.ajax = new Ajax();

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

        this.userCookies;
    }

    update () {
        if (!this.cookie.read('loggedIn')) {
            $('#logout').hide();
        }
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
                    forms.ajax.post('/register', result, (error, result) => {
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
                    forms.showMessage('regForm', 'alert-warning', 'Invalid:', error);
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
                forms.ajax.post('/login', result, (error, result) => {
                    if (!error) {
                        if (result.status) {
                            forms.showMessage('loginForm', 'alert-success', '', result.message, true);
                            forms.userCookies = forms.userCookies ? forms.userCookies : [];
                            forms.userCookies.push('loggedIn');
                            forms.cookie.create('loggedIn', true, (10 * 60 * 1000));
                            for (let value in result.cookie[0]) {
                                forms.userCookies.push(value);
                                forms.cookie.create(value, result.cookie[0][value], (10 * 60 * 1000));
                            }
                            $('#logout').show();
                        } else {
                            forms.showMessage('loginForm', 'alert-warning', data.username + ':', result.message, true);
                        }
                    } else {
                        forms.showMessage('loginForm', 'alert-danger', 'Error!', error.message);
                    }
                });
            } else {
                forms.showMessage('loginForm', 'alert-warning', 'Ogiltigt:', error);
            }
        });
    }

    logout () {
        const forms = this;
        this.ajax.post('/logout', {}, (error, result) => {
            if (!error) {
                if (result.status) {
                    for (let name in forms.userCookies) {
                        forms.cookie.delete(name);
                    }
                    $('#logout').hide();
                    forms.showMessage('logout', 'alert-success', '', result.message);
                } else {
                    forms.showMessage('#logout', 'alert-warning', 'Varning!', result.message);
                }
            } else {
                forms.showMessage('#logout', 'alert-danger', 'Error!', forms.error);
            }
        });
    }

    /*update (form) {

    }

    delete (form) {

    }*/

    validate (data, callback) {
        let aproved = true;
        for (let val in data) {
            if (!/^[a-öA-Ö0-9]+$/.test(data[val])) {
                callback('Användarnamn och lösenord får bara innehålla A-Z, a-z och 0-9.', null);
                aproved = false;
                break;
            }
            if (data[val].length < 6) {
                aproved = false;
                callback('Användarnamn och lösenord måste vara minst 6 karaktärer långa.', null);
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

}

$(document).ready(function () {const forms = new Forms();});
