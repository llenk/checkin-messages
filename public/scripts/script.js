var app = angular.module('MessageApp', []);

app.controller('MessageController', ['$http', function($http) {
  var self = this;

  self.guests = [];
  self.companies = [];
  self.messages = [];

  self.newMessage = {};

  // get information from the server
  self.getGuests = function() {
    $http({
      method: 'GET',
      url: '/guests',
    }).then(function (response) {
      self.guests = response.data;
    }).catch(function (response) {
      console.log(response);
    });
  };
  self.getCompanies = function() {
    $http({
      method: 'GET',
      url: '/companies',
    }).then(function (response) {
      self.companies = response.data;
    }).catch(function (response) {
      console.log(response);
    });
  };
  self.getMessages = function() {
    $http({
      method: 'GET',
      url: '/messages',
    }).then(function (response) {
      self.messages = response.data;
    }).catch(function (response) {
      console.log(response);
    });
  };

  self.generateMessage = function() {
    console.log(self.newMessage);
  }

  self.getGuests();
  self.getCompanies();
  self.getMessages();

}]);