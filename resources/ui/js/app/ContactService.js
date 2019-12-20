'use strict'
angular.module('demo.services', []).factory('ContactService', ["$http", "CONSTANTS", function($http, CONSTANTS) {
    var service = {};

    service.getAllContacts = function() {
        return $http.get(CONSTANTS.contacts);
    };

    service.getContactById = function(id) {
        return $http.get(CONSTANTS.contacts + id);
    };

    service.deleteContactById = function(id) {
        return $http.delete(CONSTANTS.contacts + id);
    };

    service.createContact = function(contact) {
        return $http.post(CONSTANTS.contacts, contact);
    };

    service.updateContact = function(contact) {
        return $http.put(CONSTANTS.contacts + contact.id, contact);
    };

    return service;
}]);