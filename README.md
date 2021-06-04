# Lamorak

Backend for Food Delivery App

🚧🚧 Work in Progress... 🚧🚧

## Tech Stack

- TypeScript
- Node JS
- Express JS,... or Fastify
- SQL DB - MySql/MariaDB
- TypeORM - Sql ORM
- API Testing - Postman (can test with mocha or chai later on...)

## What can it Do?

- Same City Menu fetch from all Restaurants
- Add To Cart
- Order Dishes
- Same City Delivery Person/Boy
- Guided by Admin
- Cancel Order
- Filter Searches in Menu
- Order Stages, Types (COD, Net_Banking)

## DB Migrate

```sh
npx ts-node ./node_modules/.bin/typeorm migration:generate -n DBUpdate
```

## ER Diagram

https://drawsql.app/arkaraj/diagrams/lamorak

## Postman Collections

https://www.getpostman.com/collections/fc87e3353fa60710154b

Full Postman Routes (Which are Tested Till Now):

https://documenter.getpostman.com/view/8802598/TzY4gFne
