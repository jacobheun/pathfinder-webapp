'use strict';

/*global app */

angular.module('pathfinder.controllers', []).
  controller('chatController', function ($scope) {

    $scope.chats = ["Heyo", "Whats up?"];

    $scope.addChat = function() {
      $scope.chats.push($scope.chatText);
      $scope.chatText = "";
    };

  });