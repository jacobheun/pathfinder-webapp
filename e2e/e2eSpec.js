/**
 * Runs all end to end tests
 */

describe('My Sample Static Site', function() {

  it('should render the root', function() {
    browser().navigateTo('/');
    expect(element('title').text()).toBe("Pathfinder RPG Webapp");
  });

});