'use strict'
var app = angular.module('demo', ['ui.bootstrap', 'demo.controllers',
    'demo.services'
]);
app.constant("CONSTANTS", {
    contacts: "/contacts/"
});
