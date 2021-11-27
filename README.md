CONTENTS OF THIS FILE
---------------------

 * Description
 * Installation
 * Running the test
 * Running the app

DESCRIPTION
------------

This folder contains a MEVN example for managing clients and providers. 
You will find the docs under "http://localhost:5000/api-docs/"

INSTALLATION
------------

 * Install MongoDB. Visit https://docs.mongodb.com/manual/installation/ for further information.
 * Install NodeJS. Visit https://nodejs.org/en/download/ for further information.
 * Run the following command to clone the project:
 ```bash
git clone git@github.com:MhamedBendenia/MEVN-stack.git
```
 * Run the following command in the main folder and the two subfolders to install all the dependencies:
 ```bash
npm install
```
RUNNING THE TESTS
------------

* Open a terminal, and run the following command:
```bash
mongod
```

 * Open another terminal, and run under the backend folder the following command:
 To start the mongo instance:
```bash
npm run test
```

RUNNING THE APP
------------

 * Open three (03) terminals, and run each of the following commands in one terminal.

 To start the mongo instance:
 ```bash
mongod
```

Under the backend folder run the following command:
```bash
npm run dev
```

Under the frontend folder run the following command:
```bash
npm run serve
```