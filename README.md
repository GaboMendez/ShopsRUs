# ShopsRUs Server

A retail store server, developed the back-end API with NodeJS and ExpressJS.

---

## Table of Contents

- [ShopsRUs Server](#shopsrus-server)
  - [Table of Contents](#table-of-contents)
  - [Entity Relationship Diagram](#entity-relationship-diagram)
  - [Requirements](#requirements)
    - [Node](#node)
    - [Yarn](#yarn)
    - [PostgreSQL](#postgresql)
  - [Install](#install)
  - [Configure app](#configure-app)
  - [Start server](#start-server)
  - [Features](#features)
    - [Category](#category)
    - [Product](#product)
    - [Type](#type)
    - [Client](#client)
    - [Discount](#discount)
    - [Invoice](#invoice)

## Entity Relationship Diagram

<p aling="left">
  <img src="https://i.ibb.co/T1tYXpm/ShopsRU.png" width="100%" />
</p>

## Requirements

For development, you will only need NodeJS, PostgreSQL (pgAdmin) and a node global package, Yarn, installed in your environement.

### Node

- #### Node installation on Windows

  Just go on [official NodeJS website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official NodeJS website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v16.13.1

    $ npm --version
    8.1.2

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

### Yarn

After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

### PostgreSQL

Just go on [official PostgreSQL website](https://www.postgresql.org/download/) and download the installer.
If the installation was successful, you should download [pgAdmin](https://www.postgresql.org/download/) this is the most popular and feature rich Open Source administration and development platform for PostgreSQL.

---

## Install

Clone the repository, open terminal in root and do the following on terminal

    $ git clone https://github.com/GaboMendez/ShopsRUs
    $ cd ShopsRUs
    $ yarn install

## Configure app

If you want set up locally you can follow these steps, you can also use [Thunder Client](https://www.thunderclient.com/) to test all the end-points, get the json config in `/app/config/ShopsRU_RestCollection.json` and download it to import the Collection API.

<p aling="left">
  <img src="https://i.ibb.co/wKcCmJL/Rest-Collection.png" width="30%" />
</p>

Create `/.env` file then edit it with your DB settings. This is an example, so use your information from postgreSQL:

<p aling="left">
  <img src="https://i.ibb.co/VTnXPvR/DB-Config.png" width="30%" />
</p>
  
After Setting up the database, create database tables running the DDL Scripts in `/app/config/scripts.ddl.query`, it's advisable to run the scripts on active DB connection.

Place seed database, insert data for use-cases by running the DML Scripts in `/app/config/scripts.dml.query`, it's advisable to run the scripts on active DB connection.

## Start server

    $ node server.js

If the initialization was successful, you should be able to see the following messages on the console:

    $ Server is running on port 8080.
    $ Successfully connected to the database.

## Features

Add to Base URL `http://localhost:$SERVER_PORT/` above (if you use the Collection API this PORT is 8080)

- Use the following Endpoints

### Category

`POST api/categories` Create a category

`GET api/categories or api/categories/:id` Get all categories or single category

`GET api/categories/?name="verduras"` Filter categories by name

`PUT api/categories/:id` Update a category

`DELETE api/categories or api/categories/:id` Delete all categories or single category

### Product

`POST api/products` Create a product

`GET api/products or api/products/:id` Get all products or single product

`GET api/products/?name="cereal"` Filter products by name

`GET api/products/?categoryId=3` Filter products by categoryId

`GET api/products/?categoryName="comestibles"` Filter products by categoryName

`PUT api/products/:id` Update a product

`DELETE api/products or api/products/:id` Delete all products or single product

### Type

`POST api/types` Create a type

`GET api/types or api/types/:id` Get all types or single type

`GET api/types/?name="afiliado"` Filter types by name

`PUT api/types/:id` Update a type

`DELETE api/types or api/types/:id` Delete all types or single type

### Client

`POST api/clients` Create a client

`GET api/clients or api/clients/:id` Get all clients or single client

`GET api/clients/?name="gabriel"` Filter clients by name

`PUT api/clients/:id` Update a client

`DELETE api/clients or api/clients/:id` Delete all clients or single client

### Discount

`POST api/discounts` Create a discount

`GET api/discounts or api/discounts/:id` Get all discounts or single discount

`GET api/discounts/?typeId=3` Filter discounts by typeId

`GET api/discounts/?typeName="empleado"` Filter discounts by typeName

`PUT api/discounts/:id` Update a discount

`DELETE api/discounts or api/discounts/:id` Delete all discounts or single discount

### Invoice

`POST api/invoices` Create an invoice

`GET api/invoices or api/invoices/:id` Get all invoices or single invoice

`GET api/invoices/details` Get all invoice details

`GET api/invoices/details?clientName="gabriel"` Filter invoice details by clientName

`DELETE api/invoices or api/invoices/:id` Delete all invoices or single invoice
