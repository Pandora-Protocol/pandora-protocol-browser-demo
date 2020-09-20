require("babel-regenerator-runtime");

let initialized = false

function initialize(){

    if (initialized) return;
    initialized = true;

    this.options = {

    }

    window.onload = function () {

        console.log("Demo Protocol Browser");
        load();

    };

}

function load(){

    const mainVue = require('./main-vue').default;
    mainVue(this.options);

}

initialize();
