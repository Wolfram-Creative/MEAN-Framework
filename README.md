<a href="http://wolfram-mean.herokuapp.com/"><img src="http://wolfram-mean.herokuapp.com/img/homepage/mean.png" style="width:100%"></a>

<h1>MEAN Framework</h1>
<h2>Built for the new internets</h2>
<a  target="_blank" href="http://www.mongodb.org/">Mongo</a>, <a  target="_blank" href="http://expressjs.com/">Express</a>, <a  target="_blank" href="http://angularjs.org/">Angualar</a>, and <a  target="_blank" href="http://nodejs.org/">Node</a>


Currently built with Angular(v1.2.7) View-Controller framework utilizing a node api server as your model.

Includes Zurb Foundation & normalize.css

index.html and compiled files are located and served from the www server. 


Directions

1. Install nvm and use node 0.10.24

        nvm alias default 0.10.24

2. Install node and grunt dependencies

        npm install

3. Install grunt

        npm install -g grunt-cli

4. Install Compass

        gem install compass

5. Install nodemon

        npm install -g nodemon

6. Run your server and watch files with concat

        grunt server

You can compile and uglify your app by just running grunt

    grunt






Run reports:

    plato -d reports -t "MEAN Framework" -x "node_modules|reports|\.json|vendor|www" -r .
