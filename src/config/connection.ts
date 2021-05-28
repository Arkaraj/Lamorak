import { Connection, createConnection } from "typeorm";

let connection: Connection | null = null;

// {
//   type: "mysql",
//   host: "localhost",
//   port: 3306,
//   username: `${process.env.SQL_Username}`,
//   password: `${process.env.SQL_Password}`,
//   database: `${process.env.SQL_Database}`,
//   entities: ["src/entities/*.ts"],
//   logging: true,
//   synchronize: false,
//   migrations: ["src/migration/**/*.ts"],
//   cli: {
//     entitiesDir: "src/entities",
//     migrationsDir: "src/migration",
//   },
// }

const main = async () => {
  connection = await createConnection()
    .then(async (connect) => {
      // await connect.runMigrations();
      console.log(`Connected to DB sucessfully ${connect.name}`);
      return connect;
    })
    .catch((err) => {
      console.log(`Error Occured in connecting to the DB ${err}`);
      return null;
    });
  return connection;
};

main();

export default connection;
