<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

# <center> Mi Chero </center> 

---
  
## Description

A simple API for news searching on the New York Times API and The Guardian API!. You can also save articles by providing an URL. 

## Installation

```bash
$ npm install
```
## Database
### 1- Create the database "miChero" on Postgresql

### 2- Restore the dump included in the scripts directory

```bash
  $psql showbiz < scripts/DB_BACKUP
```
## Enviroment variables

### A sample .env file is included on the root directory; if you wish to provide your own .env file you should include all the required variables in the sample .env file.

## Running the app

```bash

$ npm run start:dev

```
## Built With

- Node.js
- Typescript
- NestJS
- Postgresql
- Prettier and Eslint where used, both for linting a formatting the code.

### API Usage: 
The documentation can be found on the following link: 
https://documenter.getpostman.com/view/9661494/SWLiY5CV?version=latest

