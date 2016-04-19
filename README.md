# querystring-tracker


# Quick Start

# Prerequisites
0. nodeJS >=5.0.0
0. npm
0. Redis

## Install modules
```shell
$ npm install
```

## Running the app
Start a Redis server on 127.0.0.1:6379, and then:

```shell
$ node app.js
```

or with `forever` module

```shell
$ ./node_modules/.bin/forever -m 5 app.js
```

or (if you have installed `nodemon` module)

```shell
$ nodemon app.js --ignore log/
```

## Basic usage
```shell
$ curl -XGET -i -g "localhost:3000/track?pokus[key1]=cosi&foo=bar&baz=qux&baz=quux&corge&user[name][first]=George&user[email]=george@example.com&count=2"
```

## Running tests
Start a Redis server on 127.0.0.1:6379, and then:

```shell
$ npm run test
```
