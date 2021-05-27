// Global types
declare namespace NodeJS {
  export interface ProcessEnv {
    SQL_Username: string;
    SQL_Password: string;
    SQL_Database: string;
    SECRET: string;
  }
}

declare namespace Express {
  export interface Request {
    user?: any;
  }
}
