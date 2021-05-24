import { createConnection } from "typeorm";

const connection = createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: `${process.env.SQL_Username}`,
  password: `${process.env.SQL_Password}`,
  database: `${process.env.SQL_Database}`,
  entities: ["src/entities/*.ts"],
  logging: true,
  synchronize: true,
})
  .then((connect) => {
    console.log(`Connected to DB sucessfully ${connect.name}`);
    return connect;
  })
  .catch((err) => {
    console.log(`Error Occured in connecting to the DB ${err}`);
  });

export default connection;
