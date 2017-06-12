'use strict';

// Require the module
var express = require('express')
var expressVue = require('express-vue')
var clapDetector = require('clap-detector');

var app = express();

console.log("Clap your hand")
// Define configuration
var clapConfig = {
   AUDIO_SOURCE: 'alsa hw:1,0',
   DETECTION_PERCENTAGE_START : '5%',
   DETECTION_PERCENTAGE_END: '5%',
   CLAP_AMPLITUDE_THRESHOLD: 0.4,
   CLAP_ENERGY_THRESHOLD: 0.3,
   MAX_HISTORY_LENGTH: 10
};

// Start clap detection
clapDetector.start(clapConfig);

// Register on clap event
clapDetector.onClap(function(history) {
    console.log('one clap !', history);
});

// Register to a series of 3 claps occuring within 2 seconds
clapDetector.onClaps(3, 2000, function(delay) {
    console.log('3 clap !');
});

// Update the configuration
//clapDetector.updateConfig({CLAP_ENERGY_THRESHOLD: 0.2});

app.engine('vue', expressVue);
app.set('view engine', 'vue');
app.set('views', __dirname +  '/views');
app.set('vue', {
    componentsDir: __dirname + '/views/components',
    defaultLayout: 'layout'
});

var exampleMixin = {
    methods: {
        hello: function () {
            console.log('Hello');
        }
    }
}

app.get('/', function(req, res){
    var scope = {
        data: {
            title: 'Config Clap Light',
            message: 'Hello!'
        },
        vue: {
            head: {
                title: 'Accueil Clap Config'
            },
            mixins: [exampleMixin]
        }
    };
    res.render('index', scope);
});


app.listen(8080);
console.log('Express server listening on port 3000');
