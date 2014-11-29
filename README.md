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
  PORT=8080 node app.js
```

Enabling Server logs (disabled by default):

``` bash
  DEBUG=IC node app.js
```

Setting Environment (default=development):

``` bash
  NODE_ENV=<production|development> node app.js
```

You can mix options, examples:

``` bash
  NODE_ENV=production PORT=80 DEBUG=IC node app.js
```

## Your app in the browser

You can preview your app under [http://localhost:8080](http://localhost:8080) address unless you specified different port.

## Reload app automatically every time you change the code

The app doesn't reload itself automatically. To avoid overhead with restarting the app manually every time you change your code, you can use [nodemon](https://github.com/remy/nodemon) tool. Simply run following commands:

``` bash
sudo npm install -g nodemon
```

In your app directory:
``` bash
DEBUG=IC nodemon app.js
```

## Extending the application

### Extending Views

Since [Nunjucks](http://mozilla.github.io/nunjucks/) support [builtin filters](http://mozilla.github.io/nunjucks/templating.html#builtin-filters) as well as [custom filters](http://mozilla.github.io/nunjucks/api.html#custom-filters), you can roll out your own filters easily by creating JavaScript file in the `views/filters` directory.

``` javascript
  // Location: config/filters/nl2br.js

  module.exports = function (nunjucks) {

    /**
     * Replaces all occurences of newline with <br> tags
     *
     *   Sample Usage:
     *
     *     {{ 'Hello\n\nWorld' | nl2br }} -> Hello<br><br>World
     *
     */
    return function (string) {
      return new nunjucks.runtime.SafeString(string.replace(/\n/g, '<br>'));
    };

  };
}
```

The code above would create `nl2br` filter that will be globally available in all your nunjucks templates. Filter is nothing else than the name of the file without extension, e.g. `nl2br.js -> nl2br`.


## Contributing
Feel free to contribute or contact me at contact@maciejsmolinski.com with any questions
