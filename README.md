# IC.js

InterCity.js - express.js-based, modular and lightweight NodeJS framework/structure

Main components:
* [Express.js](http://expressjs.com/) (HTTP Server)
* [Nunjucks](http://mozilla.github.io/nunjucks/) (View Engine)

## Installation

Development Environment:

``` bash
  npm install
```

Production Environment:

``` bash
  npm install --production
```

## Running server (CLI options)

Setting Port to listen on (default=8080):

``` bash
  PORT=8080 npm start
```

Enabling Server logs (disabled by default):

``` bash
  DEBUG=IC npm start
```

Setting Environment (default=development):

``` bash
  NODE_ENV=<production|development> npm start
```

You can mix options, examples:

``` bash
  NODE_ENV=production PORT=80 DEBUG=IC npm start
```

## Your app in the browser

You can preview your app under http://localhost:8080 address unless you specified different port.

## Reload app while developing your app

The app doesn't reload itself. To avoid overhead with restarting the app manually every time you change your code, you can use [nodemon](https://github.com/remy/nodemon) tool. Simply run following commands:

``` bash
sudo npm install -g nodemon
```

In your app directory:
``` bash
DEBUG=IC nodemon ./bin/www
```

## Contributing
Feel free to contribute or contact me at contact@maciejsmolinski.com with any questions
