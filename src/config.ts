export const config = <config.Environemnts>{
  development: {
    database: {
      uri: 'mongodb://localhost/torq-development'
    },
    server: {
      host: 'localhost',
      port: process.env.PORT || '8080',
      graphiql: true,
    },
    logger: {
      debug: 'app*',
      console: {
        level: 'error'
      }
    }
  },

  test: {
    database: {
      uri: 'mongodb://localhost/torq-test',
    },
    server: {
      host: 'localhost',
      port: process.env.PORT || '8080',
      graphiql: false,
    },
    logger: {
      debug: '',
      console: {
        level: 'none'
      }
    }
  },

  // TODO: - update when production env est
  production: {
    database:{
      uri: 'mongodb://localhost/torq-production',
    },
    server: {
      host: 'torq-app.herokuapp.com',
      port: process.env.PORT || '8080',
      graphiql: false,
    },
    logger: {
      debug: '',
      console: {
        level: 'debug'
      }
    }
  }
}