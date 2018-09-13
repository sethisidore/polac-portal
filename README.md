# portalApp

```
Course Registration Portal for tertiary institutions
```

## Getting Started

First thing you need to do is install dependencies:
```
$ npm install
```

Then you can run the SPA and the API in development mode (watching for changes) with:
```
$ npm run devstart:server
```
### client and server folders

Each folder has its own scripts you can run if you just want to work in one part of the app.

## npm scripts

### npm install
`npm install` will install the root folder (development) dependencies, and after that do the same with `client` dependencies and `server` dependencies.

### build
To buid the frontend js assets
`gulp buildJs`