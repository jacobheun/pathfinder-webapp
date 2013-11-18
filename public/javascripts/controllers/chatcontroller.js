'use strict';

/*global app */

angular.module('pathfinder.controllers', ['firebase']).

  controller('chatController', ['$scope', 'angularFire', "Firebase",

    function ($scope, angularFire, Firebase) {

      var chats = new Firebase('https://pathfinder-webapp-db.firebaseio.com/chats');
      angularFire(chats.limit(15), $scope, "chats");

      $scope.addChat = function() {
        $scope.chats[chats.push().name()] = $scope.chatText;
        $scope.chatText = "";
      };

    }

  ]);