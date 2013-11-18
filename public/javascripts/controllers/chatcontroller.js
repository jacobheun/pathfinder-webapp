'use strict';

angular.module('pathfinder.controllers', ['firebase','ui.keypress']).

  controller('chatController', ['$scope', '$filter', 'angularFire', "Firebase",

    function ($scope, $filter, angularFire, Firebase) {

      var chats = new Firebase('https://pathfinder-webapp-db.firebaseio.com/chats');
      angularFire(chats.limit(15), $scope, "chats");

      $scope.addChat = function() {
        $scope.chats[chats.push().name()] = $filter('diceFilter')($scope.chatText);
        $scope.chatText = "";
      };

      $scope.clear = function() {
        $scope.chatText = "";
      };

    }

  ]);