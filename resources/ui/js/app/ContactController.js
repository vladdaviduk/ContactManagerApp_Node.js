'use strict'
var module = angular.module('demo.controllers', []);
module.controller("ContactController", ["$scope", "ContactService",
    function($scope, ContactService) {
        $scope.contactForm = {
            id: 0,
            fullName: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            cellPhoneNumber: "",
            address: ""
        };

        $scope.allContacts = [];

        ContactService.getAllContacts().then(function(value) {
            $scope.allContacts = value.data;
        }, function(reason) {
            console.log(reason);
        }, function(value) {
            console.log("no callback");
        });

        $scope.deleteContact = function(contact) {
            ContactService.deleteContactById(contact.id).then(function(value) {
                _refreshContacts();
                _clearForm();
                _showPopupIfNeeded(value)
            },function(reason) {
                console.log(reason);
            }, function(value) {
                console.log("no callback");
            });
        };

        $scope.getContactToEditing = function(contact) {
            ContactService.getContactById(contact.id).then(function(value) {
                var isErrorOccurred =_showPopupIfNeeded(value)
                if(!isErrorOccurred)
                    $scope.contactForm = value.data;
            },function(reason) {
                console.log(reason);
            }, function(value) {
                console.log("no callback");
            });
        };

        $scope.createContact = function() {
            _clearForm();
        };

        $scope.submitContact = function() {

            $scope.contactForm.fullName = $scope.contactForm.firstName + " " + $scope.contactForm.lastName;
            if($scope.contactForm.id == 0){
                ContactService.createContact($scope.contactForm).then(function(value) {
                    _refreshContacts();
                    var isErrorOccurred = _showPopupIfNeeded(value)
                    if(!isErrorOccurred){
                        _clearForm();
                        alert("Created!")
                    }

                },function(reason) {
                    console.log(reason);
                }, function(value) {
                    console.log("no callback");
                });
            }else{
                ContactService.updateContact($scope.contactForm).then(function(value) {
                    _refreshContacts();
                    var isErrorOccurred = _showPopupIfNeeded(value)
                    if(!isErrorOccurred){
                        _clearForm();
                        alert("Updated!")
                    }

                },function(reason) {
                    console.log(reason);
                }, function(value) {
                    console.log("no callback");
                });
            }
        };

        function _clearForm() {
            $scope.contactForm.id = 0;
            $scope.contactForm.fullName = "";
            $scope.contactForm.firstName = "";
            $scope.contactForm.lastName = "";
            $scope.contactForm.phoneNumber = "";
            $scope.contactForm.cellPhoneNumber = "";
            $scope.contactForm.address = "";
        }

        function _refreshContacts() {
            ContactService.getAllContacts().then(function(value) {
                $scope.allContacts = value.data;
            }, function(reason) {
                console.log(reason);
            }, function(value) {
                console.log("no callback");
            });
        }

        function _showPopupIfNeeded(value){
            if(value.data.hasOwnProperty('message')){
                if(value.data.message.hasOwnProperty('error')){
                    alert(value.data.message.error);
                    return true;
                }
            }
            return false;
        }
    }
]);

