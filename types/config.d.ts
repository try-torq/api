declare module config {
  interface Environemnts {
    development: Configuration;
    test: Configuration;
    production: Configuration
  }

  interface Configuration {
    database: DatabaseConfiguration;
    server: ServerConfiguration;
    logger: LoggerConfiguration;
  }

  interface DatabaseConfiguration {
    uri: string;
  }

  interface ServerConfiguration {
    host: string;
    port: string;
    graphiql: boolean;
  }

  interface LoggerConfiguration {
    host?: string;
    port?: string;
    file?: LoggerConsoleConfiguration;
    console: LoggerConsoleConfiguration;
    debug: string;
  }

  interface LoggerConsoleConfiguration {
    levels: Set<string>;
  }
}
