# Pathfinder Webapp
A web based application for playing the Pathfinder RPG game.

## Documentation

### Rolling Dice in Chat

Samples Rolls:
```
/d20
/2d10+2
/2d6,3d6
/1d20+2,3d6+4
/d20 attack,3d6+4 damage
/d20+2 goblins,d20+1 skeletons,d20+12 balrog
```
would yield
```
17
15
8 13
18 14
18 attack 14 damage
12 goblin 2 skeletons 32 balrog
```

## Dependencies
* Nodejs
* Npm
* grunt-cli

```
npm install -g grunt-cli
```

## Commands

* Prepare the application: ```npm install```. This will install npm and bower modules.
* Test the application: ```grunt test```.
* Run the server for dev: ```grunt dev```. This handles live reloads of client side code.
* Compile static files: ```grunt dist```. Uses karma e2e tests to hit routes and render via [express-writer](https://github.com/rtorr/express-writer).

## Tech
Css compiled from [stylus](http://learnboost.github.io/stylus/)
HTML generated with [jade](http://jade-lang.com/reference/)

## Develop

Running ```grunt dev``` will launch the server and watch local files for changes. If files are changed, the browser will live reload.
