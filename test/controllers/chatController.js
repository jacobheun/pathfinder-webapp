'use strict';

describe('Controller: chatController', function () {

  // load the controller's module
  beforeEach(function() {
    angular.module("firebase", []);
    module('pathfinder.controllers');
  });

  var chatController,
    Firebase,
    angularFire,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Firebase = function() { return {limit: function() {} }};
    angularFire = function() {};
    chatController = $controller('chatController', {
      $scope: scope,
      angularFire: angularFire,
      Firebase: Firebase
    });

  }));

  describe('/ set defaults, no options are choosen', function(){

    it('a bunch of empty data', function () {
      expect(scope.helloWorld).toEqual('Hello World');
    });


  });


});