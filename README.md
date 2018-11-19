# PolacPortal
This project is a minimal web application for my institution. As time goes, we shall see what it turns to

travis-build-status  travis-test-status

## Contributing
fork | clone the repo and install dependencies using `npm install`, make changes and create a PR

### Making Changes or Improvement
```sh
# Frontend files are located here
cd src/client

# Backend files are located here
cd src/server
```
***NOTE:*** Assets for **Client** can also easily generated using the normal `ng g asset-type assert-name` where **Asset** is any of `component|class|service|module` etc  

### building
Building both frontend and backend assets
```sh
npm run build
```
building only frontend assets
```sh
npm run client:build
```
OR
easier command since we are using angular
```sh
ng build
```
building backend assets
```sh
npm run server:build
```

### testing
run test both client and server
```sh
npm test
```
run test client alone
```sh
ng test
```
run server tests
```sh
npm run server:test
```

### production
#### bundle built files
```sh
npm run dist
```
use this 
```sh
npm start
```
