
module.exports = {
    development: {
      root: require('path').normalize(__dirname + '/..'),
      app: {
        name: 'ttoploader'
      },
      db: 'mongodb://localhost/ttoploader'
    }
  , test: {

    }
  , production: {

    }
}
