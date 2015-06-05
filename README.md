# ChatApp
A simple chat application with hapi and socket.io



## Run ChatApp
1. Get all the libraries
```
$ npm install
```

2. Run the ChatApp
```
# node app.js
```
Open as many browsers you want with this url: http://localhost:3000

3. Start Chatting

## Develp ChatApp
1. ChatApp uses webpack (http://webpack.github.io) as the module builder. To use webpack:
```
$ npm install webpack -g
```

2. Start webpack `webpack <entry> <output>`
```
$ webpack ./views/scripts/main.js ./dist/bundle.js --progress --colors --watch
```
`--watch` => Watches all dependencies and recompile on change.

3. Run the ChatApp
```
$ node app.js
```
Only after you made changes at the app.js, you have to restart the server
