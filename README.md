Angular and Node app. Utilizing Grunt

Based off an Angular(v1.1.5) View-Controller framework utilizing a node api server as your model.

Includes Zurb Foundation & normalize.css

index.html and compiled files are located and served from the www server. 
// TODO: concat angular templates and retrieve with router template.

Directions

1. Install nvm and use node 0.10.20

        nvm alias default 0.10.20

2. Install node and grunt dependencies

        npm install

3. Install grunt

        npm install -g grunt-cli

4. Install Compass

        gem install compass

5. Install nodemon

        npm install -g nodemon

6. Run Grunt and node

        // In one bash window
        grunt watch
        // In another bash window
        nodemon server.js

You can compile and uglify your app by just running grunt

    grunt
