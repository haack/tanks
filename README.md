# tanks

This is an educational programming game. You write some code for your remote controlled tank and hit "Run"!

![Pew pew pew](https://i.gyazo.com/7a11abe1fd41402aa2ceb3d2f87ef6b4.gif)

## Getting started
Before you start, [install and run](#installation) the app.

Now the fun begins. We'll first create an empty bot. Copy the following code into the editor on the left:

```js
// You can rename the bot!
class MyBot extends Bot {
  create() {}

  update() {}
}

module.exports = MyBot;
```

Now hit "Run", you should see your tank appear in the game view on the right. Now we can make it do things!

## Tank lifecycle

You can see there 2 functions on your tank already. These will be called during the lifecycle of a game.

1. `create()` is called when your tank is first created at the start of each game. This is useful for initialising your bot. You can also call commands (explained below) here.
2. `update()` is called each "tick" of the game. A "tick" is each frame when the game engine updates the world. It will move all objects and do things like resolve collisions. This is a good place to put any code that you want to run throughout the game (e.g. scanning for changes in the world).

## Commands

So what can I do with my tank? Here are the built in `Bot` functions you can call that will make your tank do things.

```js
// It wouldn't legally be a tank if it couldn't move!
// Use this function to set drive speed between 1 (forward) and -1 (backwards)
// driveSpeed will be clamped at magnitude of 1, no speeding for you!
this.drive(driveSpeed);

// Rotation is as straightforward as specifying a clockwise rotational speed.
// Set `rotationSpeed` to -1 to turn left and 1 to turn right.
this.rotate(rotationSpeed);

// Very similar to tank rotation but will only move your turret.
this.rotateTurret(rotationSpeed);

// Shoots a bullet in the direction your turret is facing.
// Note: there is a reload time for bullets.
this.shoot();

// Scans the worlds and provides a list of objects and their locations
// Use this to find and shoot your enemies. Remember enemies move, so
// you may want to keep scanning to track them
this.scan();

// You can add/remove a marker in the world, it doesn't do anything just looks cool.
// This is useful for debugging if to highlight positions on the map.
// E.g. you can see where you're aiming, or create visual waypoints.
this.setMarker({ x, y });
this.clearMarker();
```

## Modules

There are a few small modules that will help you build your tank logic. And you can add your own!

- [Nav](src/util/nav.js): Sick of writing logic for navigating to things? This is the module for you
- [Bearing](src/util/bearing.js): Utility function to make it easier to work with directions. Handles radians + degrees.
- [Point](src/util/point.js): Measure distances and angles between points.

Modules are accessible at `lib.ModuleName`

## Tips

- You can log to console from your bot. Open your browser dev tools to see them
- As long as you have a Bot class that is exported, with implementations for `create()` and `update()` you can add whatever code you want! This means storing state in your bot, more bot functions, more classes etc. Go wild!
- Have fun!

## Example 

- [Waypoint chaser](https://gist.github.com/haack/4fccd52bb17106d34d89a6600112ce5d). This bot uses all commands and the Nav module.

# Installation

The game isn't currently hosted but you can run it yourself easily:
```
yarn
yarn watch
yarn serve
```
