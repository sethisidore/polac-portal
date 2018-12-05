# PolacPortal
This project is a minimal web application for my institution. As time goes, we shall see what it turns to

travis-build-status  travis-test-status

## Contributing
fork | clone the repo and install dependencies using `npm install`, make changes and create a PR

### Making Changes or Improvement
```bash
# Frontend files are located here
cd src/client

# Backend files are located here
cd src/server
```
***NOTE:*** Assets for **Client** can also easily generated using the normal `ng g asset-type assert-name` where **Asset** is any of `component|class|service|module` etc  

### building
Building both frontend and backend assets
```bash
npm run build
```
building only frontend assets
```bash
npm run client:build
```
OR
easier command since we are using angular
```bash
ng build
```
building backend assets
```bash
npm run server:build
```

### testing
run test both client and server
```bash
npm test
```
run test client alone
```bash
ng test
```
run server tests
```bash
npm run server:test
```

### production
#### bundle built files
```bash
npm run dist
```
use this 
```bash
npm start
```
