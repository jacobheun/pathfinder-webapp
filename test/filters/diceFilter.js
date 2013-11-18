'use strict';

/**
 * Test the dice filter
 */
describe('DiceFilter', function () {

  var diceFilter = null;

  // load the filters's module
  beforeEach(function() {
    module('pathfinder.filters');
  });

  // Initialize the filter
  beforeEach(inject(function ($filter) {

    diceFilter = $filter('diceFilter');

  }));

  // Verify proper parsing is happening for dice rolls
  describe('when filtering commands', function() {

    // Check for bad commands
    describe('when given an invalid command', function() {

      it("should return the original text", function() {

        var text = "/b20";

        expect(diceFilter(text)).toEqual("/b20");

      });

    });

    it("should yield a number when rolling a single die", function() {

      var text = "/d20";

      // Chats are strings, lets get the number value
      var value = Number( diceFilter(text) );

      expect(isNaN(value)).toBe(false);

    });

    it("should work case insensitive", function() {

      var text = "/D20";

      // Chats are strings, lets get the number value
      var value = Number( diceFilter(text) );

      expect(isNaN(value)).toBe(false);

    });

    it("should yield a number when rolling a with a die multiplier", function() {

      var text = "/5d6";

      // Chats are strings, lets get the number value
      var value = Number( diceFilter(text) );

      expect(isNaN(value)).toBe(false);

    });

    it("should yield two numbers when separating rolls by a comma", function() {

      var text = "/d20,2d6";

      // Get the rolls, separated by a space
      var rolls = diceFilter(text).split(" ");
      var val1 = Number(rolls[0]);
      var val2 = Number(rolls[1]);

      // Both values should be numbers
      expect(isNaN(val1)).toBe(false);
      expect(isNaN(val2)).toBe(false);

    });

    it('should yield a number when adding a value to a single die', function() {

      var text = "/d20+5";

      // Chats are strings, lets get the number value
      var value = Number( diceFilter(text) );

      expect(isNaN(value)).toBe(false);

    });

    it('should yield a number and name when specifying a roll name', function() {

      var text = "/d20 skeletons";

      // This regex ensures there is a number of length 1-2, a space, and the word skeletons
      expect( diceFilter(text) ).toMatch( /^[0-9]{1,2}[\s]{1}skeletons$/ );

    });

    it('should handle complex dice rolls', function() {

      var text = "/d20+2 goblins,d20+1 skeletons,d20+12 balrog";

      // This regex ensures a match such as this: '12 goblins 2 skeletons 32 balrog', where numbers can be 1-2 digits
      expect( diceFilter(text) ).toMatch(/^[0-9]{1,2}[\s]{1}goblins[\s]{1}[0-9]{1,2}[\s]{1}skeletons[\s]{1}[0-9]{1,2}[\s]{1}balrog$/);

    });

  });


});