class Cookies {
    constructor() {
        this.read('');
    }

    create (name, value, exp) {
        let expires;
        if (exp) {
            const date = new Date();
            date.setTime(date.getTime() + exp);
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }

        document.cookie = name + "=" + value + expires + "; path=/";
        this.read(name);
    }

    read (name){
        if (this.cookies) {
            return this.cookies[name];
        }

        const c = document.cookie.split('; ');
        this.cookies = {};

        let C;
        for (let i = c.length - 1; i >= 0; i--) {
           C = c[i].split('=');
           this.cookies[C[0]] = C[1];
        }

        return this.cookies[name];
    }

    delete (name) {
        this.create(name, '', -1);
    }

}
