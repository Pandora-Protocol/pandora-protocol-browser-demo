let initialized = false

function initialize(){

    if (initialized) return;
    initialized = true;

    this.options = {

    }

    document.addEventListener("DOMContentLoaded",  (event) => {

        console.log("Demo Protocol Browser");
        load();

    });

}

function load(){

    const mainVue = require('./main-vue').default;
    mainVue(this.options);

}

initialize();