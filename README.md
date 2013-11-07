asok-frontend
=============

Asok is the ractive frontend for the [asok backend](https://github.com/TuvokVersatileKolinahr/asok-backend).

The simple index does the following things:

* include main.js from the scripts folder with require: `<script data-main="scripts/main" src="scripts/require.js"></script>`
* setup a couple of containers for the content
  * Ractive's main output container `<div id='container'></div>`
  * The navigation's target with some placeholder links in it for styling `<ul id="target">`

###main.js
Uses the  the [Ractive RequireJS loader plugin](https://github.com/Rich-Harris/Ractive/wiki/Using-Ractive-with-RequireJS), it will pre-parse the template for us.

It attaches a listener to the `<button on-tap='getgreet'>Say!</button>` which is created in the main.html template in the templatefolder. This listener calls the [`"/hapi/hello"`](https://github.com/TuvokVersatileKolinahr/asok-backend/blob/master/modules/simplehello.js) backend-call from the backend project. 

###design
The repository also includes a rudimentary design for a marketplace in the `design` folder.
