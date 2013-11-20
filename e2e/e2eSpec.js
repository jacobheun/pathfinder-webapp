/**
 * Runs all end to end tests
 */

describe('Pathfinder WebApp', function() {

  beforeEach(function() {

    browser().navigateTo('/');

  });

  it('should render the root when clicking home', function() {

    element('a[href="/"]').click();
    expect(element('title').text()).toBe("Pathfinder RPG Webapp");

  });

  it('should render items page', function() {

    element('a[href="/items"]').click();
    expect(element('title').text()).toBe("Pathfinder - Items");

  });

});