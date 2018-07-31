var app = angular.module('MessageApp', []);

app.controller('MessageController', ['$http', function($http) {
  var self = this;

  self.guests = [];
  self.companies = [];
  self.messages = [];

  self.newMessage = {guest: '1', company: '1', message: '1'};

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
    self.newMessage.text = self.messages[self.newMessage.message].text;
    self.newMessage.guest = self.guests[self.newMessage.guest];
    self.newMessage.company = self.companies[self.newMessage.company];
    console.log(self.newMessage);
    for (let i=0; i<self.messages[self.newMessage.message].values.length; i++) {
      // parse timestamps differently, since they should convert to times
      if (self.messages[self.newMessage.message].values[i] == "guest.reservation.startTimestamp") {

      }
      else if (self.messages[self.newMessage.message].values[i] == "guest.reservation.endTimestamp") {

      }
      // parse everything else just as how it's stored
      else {
        let access = self.messages[self.newMessage.message].values[i].split('.');
        console.log(access);
        let current = self.newMessage;
        for (token of access) {
          current = current[token];
        }
        self.newMessage.text = self.newMessage.text.replace('$' + i, current);
        console.log(self.newMessage.text);
      }
    }
  }

  self.getGuests();
  self.getCompanies();
  self.getMessages();

}]);