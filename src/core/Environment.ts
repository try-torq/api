import { config } from '../'

export class Environment {
  public static get $name(): string {
    return process.env.NODE_ENV || 'development';
  }

  public static get isTest(): boolean {
    return this.$name === 'test';
  }

  public static get isDevelopment(): boolean {
    return this.$name === 'development';
  }

  public static get isProduction(): boolean {
    return this.$name === 'production';
  }

  public static get config(): config.Configuration {
    return config[this.$name];
  }
}
