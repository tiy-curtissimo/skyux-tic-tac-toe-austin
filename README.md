# SKYUX2 Tic-Tac-Toe

In this repository, you can find an implementation of tic-tac-toe using
the SKYUX2 toolchain.

## How to develop

In server, you'll find the tic-tac-toe server against which you can build
the SKYUX2 application. Just `cd server` and `npm start`. You can find
documentation about the API in the README.

## How to use this repository

There are some branches, here. Check them out to see the development of
the application in different stages.

* **master**: The starting point: an empty Swagger server with a "good" API
  definition.
* **01-typescript-controller**: Using TypeScript to implement the server with
  tests.
* **02-empty-skyux-app**: Now, with a front-end app to consume the service.
* **03-create-a-game**: An Angular 2 component to allow the user to start a new
  game of tic-tac-toe.
* **04-game-lobby**: Another Angular 2 component to allow users to see the
  games they're playing or they've played.
* **05-game-board**: An Angular 2 component to allow a player to see what's
  going on and to take a turn.
* **06-delete-a-game**: An Angular 2 component to allow the user to delete a
  game.
