<!-- 
Created by Brian Noah https://github.com/bjoshuanoah
-->

<a href="http://wolfram-mean.herokuapp.com/" target="_blank"><img src="http://wolfram-mean.herokuapp.com/img/homepage/mean.png" style="width:100%"></a>

<h1>MEAN Framework</h1>
<h2>Built for the new internets</h2>
<a  target="_blank" href="http://www.mongodb.org/">Mongo</a>, <a  target="_blank" href="http://expressjs.com/">Express</a>, <a  target="_blank" href="http://angularjs.org/">Angular</a>, and <a  target="_blank" href="http://nodejs.org/">Node</a>

<a href="http://wolfram-mean.herokuapp.com/" target="_blank">View live demo</a>

Currently built with Angular(v1.2.7) View-Controller framework utilizing a node api server as your model.

Includes Zurb Foundation & normalize.css

index.html and compiled files are located and served from the www directory. If you want to just use nginx to serve your static files, just direct your virtual host to the www directory. This will bypass any node server, and you will be using the framework just for your angular app.


Directions

1. Install nvm and use node 0.10.24

        nvm alias default 0.10.24

2. Install node and grunt dependencies

        npm install

3. Install grunt

        npm install -g grunt-cli

4. Install nodemon

        npm install -g nodemon

5. Run your server and watch files with concat

        grunt server

You can compile and uglify your app by just running grunt

    grunt






Run reports:

    plato -d reports -t "MEAN Framework" -x "node_modules|reports|\.json|vendor|www" -r .
