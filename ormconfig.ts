module.exports = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: `${process.env.SQL_Username}`,
  password: `${process.env.SQL_Password}`,
  database: `${process.env.SQL_Database}`,
  entities: ["src/entities/*.ts"],
  logging: true,
  synchronize: false,
  migrations: ["src/migration/**/*.ts"],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migration",
  },
};
