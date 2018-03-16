const parsePrk = (key: string) => key.replace(/\\n/g, '\n');

const GCLOUD_BASE = {
  projectId: process.env.GCLOUD_PROJECT_ID,
  clientEmail: process.env.GCLOUD_CLIENT_EMAIL,
  privateKey: parsePrk(process.env.GCLOUD_PRIVATE_KEY),
}

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
        levels: new Set(['error', 'warn', 'debug', 'info'])
      }
    },
    cloudStorage: {
      ...GCLOUD_BASE,
      storageBucketUri: process.env.GCLOUD_STAGE_STORAGE_BUCKET_URI
    }
  },

  test: {
    database: {
      uri: 'mongodb://localhost/torq-test',
    },
    server: {
      host: 'localhost',
      port: process.env.PORT || '5756',
      graphiql: false,
    },
    logger: {
      debug: '',
      console: {
        levels: new Set()
      }
    },
    cloudStorage: {
      ...GCLOUD_BASE,
      storageBucketUri: process.env.GCLOUD_STAGE_STORAGE_BUCKET_URI
    }
  },

  // TODO: - update when production env est
  production: {
    database:{
      uri: process.env.MONGODB_ATLAS_CLUSTER_URI,
      username: process.env.MONGODB_ATLAS_CLUSTER_USER,
      password: process.env.MONGODB_ATLAS_CLUSTER_PASS,
    },
    server: {
      host: process.env.HOST || 'torq-app.herokuapp.com',
      port: process.env.PORT || '80',
      graphiql: false,
    },
    logger: {
      debug: '',
      console: {
        levels: new Set(['error', 'debug'])
      }
    },
    cloudStorage: {
      ...GCLOUD_BASE,
      storageBucketUri: process.env.GCLOUD_PROD_STORAGE_BUCKET_URI
    }
  }
}
