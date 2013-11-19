'use strict';

/*global app */

angular.module('pathfinder.filters', []).

/**
 * Dice filter handles parsing text for dice based command rolls
 */
  filter('diceFilter', function () {

    /**
     * Takes a string and returns the first number
     * ex: '/d6' would return 6;
     * @param text
     * @returns {Number}
     */
    function getDie(text) {
      // If we do not match d<number>, throw error
      if (!/[dD][0-9]{1,}/.test(text)) throw new Error("Invalid command");

      return Number( text.match(/[0-9]{1,}/) );
    }

    /**
     * Takes a string of text and returns the descriptors
     * ex: 'd6 goblin wizard' would return 'goblin wizard'
     * @param text
     * @returns {string}
     */
    function getDescriptor(text) {
      var split = text.split(" ");
      split.shift();
      return split.join(" ");
    }

    /**
     * Takes a string of text and returns any modifiers
     * ex: 'd6+2' would return 2; '2d6+2+1' would return 3;
     * @param text
     * @returns {Number}
     */
    function getModifier(text) {
      var modifiers = text.match(/[\+\-]{1}[0-9]{1,}/g);
      var value = 0;

      _.each(modifiers, function(val) {
        var num = parseInt(val, 10);
        if (!isNaN(num)) value += num;
      });

      return value;
    }

    /**
     * Takes a string and returns any multiplier
     * ex: '/2d6' would return 2; '/d4' would return 1
     * @param text
     * @returns {Number}
     */
    function getMultiplier(text) {

      // If we do not match /<number>d, return 1
      if (!/\/[0-9]{1,}d/.test(text)) return 1;

      return Number( text.match(/[0-9]{1,}/) );
    }

    /**
     * Takes a string of text and returns an array of commands
     * @param text
     * @returns {Array}
     */
    function getRolls(text) {
      return text.split(",");
    }

    /**
     * Returns a random number between 1 and the number given
     * @param number
     * @returns {Number}
     */
    function rollDie(number) {
      return Math.floor( ( Math.random() * number ) + 1 );
    }

    /**
     * Attempts to parse input for die rolls, if it cannot, it will return the original input
     * @param input {String}
     * @returns {String}
     */
    function parseInputForDieRolls(input) {
      var outputs = [];

      try {

        // if it's not a command, leave
        if (input[0] !== "/") return input;

        // Get die rolls
        var rolls = getRolls(input);

        _.each(rolls, function(roll) {
          var remainingText = roll;

          // Get the descriptors
          var descriptors = getDescriptor(remainingText);
          remainingText = remainingText.replace(descriptors,"");

          // Get the modifier
          var modifier = getModifier( remainingText );
          remainingText = remainingText.split("+")[0];

          // Get the multiplier
          var multiplier = getMultiplier( remainingText );
          remainingText = remainingText.replace(/\/[0-9]{0,}/,"");

          // Get the die
          var die = getDie(remainingText);

          // Roll the die for the total multiplier
          var totalRoll = 0;
          _(multiplier).times(function() {
            totalRoll += rollDie(die);
          });

          var total = totalRoll + modifier;

          console.debug("Descriptors: ", descriptors, " modifier: ", modifier, " multiplier: ",
            multiplier, " die: ", die, " totalRoll: ", totalRoll, " total: ", total);

          outputs.push( [total, descriptors].join(" ") );

        });

      } catch(err) {
        // If there is an error, just return the input
        return input;
      }

      return outputs.join(" ");
    }

    return parseInputForDieRolls;

  });
