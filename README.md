# IC.js

InterCity.js - express.js-based, modular and lightweight NodeJS framework/structure

Main components:
* Express.js (HTTP Server)
* Nunjucks   (View Engine)

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
  NODE_ENV=prodiction PORT=80 DEBUG=IC npm start
```

## Contributing
Feel free to contribute or contact me at contact@maciejsmolinski.com with any questions
