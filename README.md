# Lamorak

A Smart Backend for Food Delivery App

Live for Fooood!!

## Tech Stack

- TypeScript
- Node JS
- Express JS,... or Fastify
- SQL DB - MySql/MariaDB
- TypeORM - Sql ORM
- API Testing - Postman (can test with mocha or chai later on...)

## What can it Do?

- View Restaurants, Dishes, Menus Nearby you (Same city/address)
- Filter Dishes By Name, price Range and Restaurant's rating
- Images of the Dish (with multer)
- Add To Cart
- Restaurant's Discounts
- Order Dishes
- Rate Restaurants
- Same City Delivery Person/Boy
- Guided by Admin
- Cancel Order
- Coupon Codes
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

Routes Documentation:

https://documenter.getpostman.com/view/8802598/TzY4gFne

#### Notes

- Index "city" field in Address Entity to fetch rows easily

## To Run It Locally

```bash

# Install all Dependencies
$ npm install

# Create .env file
touch .env

# Convert Typescript Files to Js for Production
$ npm run build

# To Run it in Development Itself
$ npm run dev

# To Run in Production
$ npm start

```

- Contents in .env file

```txt
SQL_Username =
SQL_Password =
SQL_Database =
SECRET =
```

Runs on Localhost port: 3002
