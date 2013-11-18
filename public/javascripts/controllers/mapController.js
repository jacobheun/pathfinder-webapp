'use strict';

angular.module('pathfinder.controllers').

  controller('mapController', ['$scope', 'angularFire', "Firebase",

    function ($scope, angularFire, Firebase) {

      var spaces = new Firebase('https://pathfinder-webapp-db.firebaseio.com/gamesession/development/maps/test_map/spaces');
      angularFire(spaces, $scope, "spaces");

      $scope.generateMap = function() {

        // Clear out the current spaces
        spaces.remove();

        // Let's create a grid to start with
        _.times(10, function(y) {

          var column = spaces.push();

          _.times(10, function(x) {

            // Create a new space
            column.push({ x : x, y : y });

          });

        });

      };

    }

  ]);