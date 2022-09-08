# RESTAPI typescript

Pre-requisite to run this

- Running nodejs with version 14 or higher
- npm version 8 or higher
- local server of MySQL

## Startup

To start the project after cloning the repo and `npm install`. You should probably do `npm update` to update the dependencies

Then the startup commands are as follows

```bash
> npm run dev # for testing purposes
> npm start   # runs the production server
```

on Starting the server it will default to running on `port: 5000` to change this please set a `PORT` in a `.env` file in the root directory

Be sure to also set the values for all the other variables as provided in the `.env.example` file. These names should be expressive enough to understand.

At this point everything should be running smoothly. Hopefully

## API

### Auth

This backend uses a restful refresh token base api system to manage it's auth processes.
