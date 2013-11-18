'use strict';

/**
 * Test the chat controller
 */
describe('ChatController', function () {

  var $scope = null;
  var chatController = null;

  // Mock the firebase chat endpoint
  var mockFirebase = function() {
    return {
      limit: function() {},
      push : function() {
        return {
          name : function() {
            return "uniquename";
          }
        }
      }
    }
  };

  // Mock angularFire
  var mockAngularFire = function() {};

  // load the controller's module
  beforeEach(function() {
    angular.module("firebase", []);
    module('pathfinder.controllers');
  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope, $controller) {

    $scope = $rootScope.$new();
    $scope.chats = {};

    chatController = $controller('chatController', {
      $scope: $scope,
      angularFire: mockAngularFire,
      Firebase: mockFirebase
    });

  }));

  describe('on addChat', function() {

    it('should clear out property chatText', function() {

      $scope.chatText = "My new chat.";

      $scope.addChat();

      expect($scope.chatText).toEqual("");

    });

    it('should add to the chats property', function() {

      $scope.chatText = "My new chat.";

      $scope.addChat();

      expect($scope.chats).toEqual({"uniquename" : "My new chat."});

    });

    // Verify proper parsing is happening for dice rolls
    describe('when submitting dice rolls', function() {

      // Check for bad commands
      describe('when given an invalid command', function() {

        it("should display the text as a chat", function() {

          $scope.chatText = "/b20";

          $scope.addChat();

          expect($scope.chats).toEqual({"uniquename" : "/b20"});

        });

      });

      it("should yield a number when rolling a single die", function() {

        $scope.chatText = "/d20";

        $scope.addChat();

        // Chats are strings, lets get the number value
        var value = Number($scope.chats["uniquename"]);

        expect(isNaN(value)).toBe(false);

      });

      it("should yield a number when rolling a with a die multiplier", function() {

        $scope.chatText = "/5d6";

        $scope.addChat();

        // Chats are strings, lets get the number value
        var value = Number($scope.chats["uniquename"]);

        expect(isNaN(value)).toBe(false);

      });

      it("should yield two numbers when separating rolls by a comma", function() {

        $scope.chatText = "/d20,2d6";

        $scope.addChat();

        // Get the rolls, separated by a space
        var rolls = $scope.chats["uniquename"].split(" ");
        var val1 = Number(rolls[0]);
        var val2 = Number(rolls[1]);

        // Both values should be numbers
        expect(isNaN(val1)).toBe(false);
        expect(isNaN(val2)).toBe(false);

      });

      it('should yield a number when adding a value to a single die', function() {

        $scope.chatText = "/d20+5";

        $scope.addChat();

        // Chats are strings, lets get the number value
        var value = Number($scope.chats["uniquename"]);

        expect(isNaN(value)).toBe(false);

      });

      it('should yield a number and name when specifying a roll name', function() {

        $scope.chatText = "/d20 skeletons";

        $scope.addChat();

        var value = $scope.chats["uniquename"];

        // This regex ensures there is a number of length 1-2, a space, and the word skeletons
        expect(value).toMatch(/^[0-9]{1,2}[\s]{1}skeletons$/);

      });

      it('should handle complex dice rolls', function() {

        $scope.chatText = "/d20+2 goblins,d20+1 skeletons,d20+12 balrog";

        $scope.addChat();

        var value = $scope.chats["uniquename"];

        // This regex ensures a match such as this: '12 goblins 2 skeletons 32 balrog', where numbers can be 1-2 digits
        expect(value).toMatch(/^[0-9]{1,2}[\s]{1}goblins[\s]{1}[0-9]{1,2}[\s]{1}skeletons[\s]{1}[0-9]{1,2}[\s]{1}balrog$/);

      });

    });

  });


});