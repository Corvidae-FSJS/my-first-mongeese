# LAB: Express

Add fidelity and tests to a fully functional REST API built with Express


**This is a paired lab, but each person use own repo**

## Before you begin
Refer to *Getting Started*  in the [lab submission instructions](../../../reference/submission-instructions/labs/README.md) for complete setup, configuration, deployment, and submission instructions.

## Getting Started

You will be continuing with your model lab from Monday. There is lots of `starter-code` available for boilerplate setup files.

## Requirements

Use your repository and mongoose model from Monday's lab to build out 
an API server with full CRUD that is deployed to heroku.

### Setup API Server

Modularize the "server" into two parts:

1. `lib/app.js` should contain all of the logic for setting up the server application. What routes, middleware, error handling, etc. It should export an http handler function (that is what `express()` returns!)
1. `server.js` should contain all of the code for configuring and starting the server. It is the main entry point for starting your running server. It handles loading `.env` config, connecting to the db and creating an http server using `app` and starts listening.

Make sure your server starts:
1. Make sure you have package json scripts for `start` and `start:watch`.
1. Add an `app.get('/hello', ...)` that does res.send('hello world');
1. Run the server and manually test that route works, as well as 404 handlers

### Test API Server

In `/e2e` write e2e tests using `supertest`. Follow setup from class demo closely

#### Test `app`

In `app.test.js` write e2e tests using `supertest`, test:
1. `app.get('/hello', ...)` route
1. Both of the 404 handlers.

#### Test domain routes

Create a test file for your model's route (for example `cats.tests.js`).

Use the helper util to drop the associated mongo collection in `beforeAll`

Work through the following crud tests, writing each route as you go:
1. `POST` a resource (extract to function when it works!) 
1. `GET` a resource (use POST function, then get it)
1. `GET` list of resources (use POST function, then get list and check length)
1. `UPDATE` a resource (use POST function, then update object and save it, test updated object)
1. `DELETE` a resource (use POST function, then delete. Check that a `GET` returns `404`)

### Stretch Goals:

Add support for a second model!
* Ideally related to first model
* New test file to drive additional CRUD routes

## Assignment Submission Instructions
Refer to the the [lab submission instructions](../../../reference/submission-instructions/labs/README.md) for the complete lab submission process and expectations
