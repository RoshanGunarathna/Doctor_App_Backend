// custom-env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    MYSQL_HOST: string;
    MYSQL_DATABASE: string;
    MYSQL_USER: string;
    MYSQL_PASSWORD: string;
    MYSQL_PORT: number;
    JWT_SECRET: string;
    JWT_EXPIRES_TIME: string;
    COOKIE_EXPIRES_TIME: number;
  }
}
