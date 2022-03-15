# ShopsRUs Server

A retail store server, developed only the back-end API with NodeJs and ExpressJs.

---

## Table of Contents

- [ShopsRUs Server](#shopsrus-server)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
    - [Node](#node)
    - [PostgreSQL](#postgresql)
    - [Yarn installation](#yarn-installation)
  - [Install](#install)
  - [Configure app](#configure-app)
  - [Start server by running](#start-server-by-running)

## Requirements

For development, you will only need Node.js, PostgreSQL (pgAdmin) and a node global package, Yarn, installed in your environement.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v16.13.1

    $ npm --version
    8.1.2

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

### PostgreSQL

Just go on [official PostgreSQL website](https://www.postgresql.org/download/) and download the installer.
If the installation was successful, you should download [pgAdmin](https://www.postgresql.org/download/) this is the most popular and feature rich Open Source administration and development platform for PostgreSQL.

### Yarn installation

After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Install

Clone the repository, open terminal in root and do the following on terminal

    $ git clone https://github.com/GaboMendez/ShopsRUs
    $ cd ShopsRUs
    $ yarn install

## Configure app

If you want set up locally you can follow these steps, you can also use `Thunder Client`(https://www.thunderclient.com/) to test, get the json config in `/app/config/ShopsRU_RestCollection.json` and download it to import the Collection API.

<p aling="left">
  <img src="https://i.ibb.co/wKcCmJL/Rest-Collection.png" width="30%" />
</p>

Create `/.env` file then edit it with your DB settings. This is an example, so use your information from postgreSQL:

<p aling="left">
  <img src="https://i.ibb.co/hDL1Fyw/DB-Config.png" width="30%" />
</p>
  
After Setting up the database, create database tables running the DDL Scripts in `/app/config/scripts.ddl.sql`, its advisable to run the scripts on active DB connection.

Place seed database, insert data for use-cases by running the DML Scripts in `/app/config/scripts.dml.sql`, it's advisable to run the scripts on active DB connection.

## Start server by running

    $ node server.js
