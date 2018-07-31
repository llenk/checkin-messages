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

  self.timeGreeting = function(time) {
    let date = new Date(time * 1000);
    let hour = date.getHours();
    console.log(date, hour);
    if (hour <= 11) {
      // between midnight and noon is good morning
      return 'Good morning';
    }
    else if (hour <= 16) {
      // between noon and 5pm is afternoon
      return 'Good afternoon';
    }
    else { 
      // otherwise, evening
      return 'Good evening';
    }
  }

  self.generateMessage = function() {
    self.newMessage.text = self.messages[self.newMessage.message - 1].text;
    self.newMessage.values = self.messages[self.newMessage.message  - 1].values;
    self.newMessage.guest = self.guests[self.newMessage.guest - 1];
    self.newMessage.company = self.companies[self.newMessage.company - 1];
    console.log(self.newMessage);
    for (let i=0; i<self.newMessage.values.length; i++) {
      // parse timestamps differently, since they should convert to times
      if (self.newMessage.values[i] == "guest.reservation.startTimestamp") {
        self.newMessage.text = self.newMessage.text.replace('$' + i, self.timeGreeting(self.newMessage.guest.reservation.startTimestamp));
      }
      else if (self.newMessage.values[i] == "guest.reservation.endTimestamp") {
        self.newMessage.text = self.newMessage.text.replace('$' + i, self.timeGreeting(self.newMessage.guest.reservation.endTimestamp));
      }
      // parse everything else just as how it's stored
      else {
        let access = self.newMessage.values[i].split('.');
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