import { Connection, createConnection } from "typeorm";

let connection: Connection | null = null;

const main = async () => {
  connection = await createConnection({
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
  })
    .then((connect) => {
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
