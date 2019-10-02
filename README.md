# Water-Contest

## Introduction
![alt text](https://github.com/jyao8112/CA-Water-Contest/blob/master/screenshots/Screen%20Shot%202019-10-01%20at%2011.41.28%20PM.png)
![alt text](https://github.com/jyao8112/CA-Water-Contest/blob/master/screenshots/Screen%20Shot%202019-10-01%20at%2011.44.17%20PM.png)
![alt text](https://github.com/jyao8112/CA-Water-Contest/blob/master/screenshots/Screen%20Shot%202019-10-01%20at%2011.54.10%20PM.png)
![alt text](https://github.com/jyao8112/CA-Water-Contest/blob/master/screenshots/Screen%20Shot%202019-10-01%20at%2011.56.19%20PM.png)
## Demo
[![Watch the Demo](https://github.com/jyao8112/CA-Water-Contest/blob/master/screenshots/IMG_7755.jpg)](https://www.youtube.com/watch?v=PsBkwDi22XA&feature=youtu.be)_
## Frontend Set-up Instruction

This instruction will help you start running frontend project on your local machine.

### Prerequisites
You need install Node.js and npm to run this project.

### Installing
* Download [Node.js](https://nodejs.org/en/). Follow the instruction from official document and install Node.js on your local machine.
* After successfully installing Node.js, you can run  `node --version`, and you will see something like ` v10.16.3 `.
* Also, you need to check if npm is installed. Run `npm --version`, and you will see something like `6.9.0`.

Now you are all set.

### Run Project
* Pull the project to your local machine and go to `Water-Contest/frontend/water-project`.
* Before running the project, you need to run `npm install` to download all dependent modules required to support the project. 
After installation you will see a new `node_modules` folder show up in current directory.
* Run `npm run build` to compile all js files into `bundle.js`. You will also be able to modify files and see latest changes on webpage without restarting, since this command will watch your local changes and keep updating the `bundle.js` file.
* Run  `npm run serve` to start the server. The port will be on 8080, so go to `localhost:8080` and you will see the front page.

### Allow CORS
We will possibly come across [CORS error](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors) when making http request, to solve this issue 
you need to add an extension plugin in your browser (recommend Firefox).

#### Firefox
* Go to "Add-ons" and search for "Allow CORS: Access-Control-Allow-Origin", add it to your browser.
* Go back to your webpage, activate the plugin by clicking on the plugin icon on top right corner.
* Restart your server, and now everything will work.

#### Chrome
* For Chrome, go to "More Tools -> Extensions", and add the same plugin as above. Remember to activate the plugin.
