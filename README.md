# Set up

- sudo docker-compose up -d
- npm i
- npm run server
- use insomnia dump from folder called INSOMNIA

# Things I would do differently

- add roles to users, authentication, login, salt!
- structure endpoints differently
- went mostly by documentation and given instructions => missing key CRUD operations
- Status codes instead of 200 => when creating 201
- use ORM
- better error handling 
- better logging and documentation
- finish last endpoint
- dockerize node js server

## Time consumed around 8 hours

## Partial documentation 

POST /user/request

Creates a new user.
Arguments:
* login - mandatory, unique
* password - mandatory
* email - mandatory, unique
Returns:
* id of the user


POST /machine

Registers a coffee machine.
Arguments:
* name
* caffeine - mg per cup
Returns:
* id of the coffee machine


POST /coffee/buy/:userId/:machineId/now

Registers a coffee bought by the user at a current time

POST /coffee/buy/:userId/:machineId
Registers a coffee bought by the user at a given time
Arguments:
* timestamp - iso-8601 timestamp

GET /stats/coffee
GET /stats/coffee/machine/:id
GET /stats/coffee/user/:id
Returns history of user's transactions per user/machine or global
Returns:
* list of objects, containing
    * machine
    * user
    * timestamp
GET /stats/level/user/:id
Returns the history of the user's caffeine level. Let’s assume that caffeine level increases linearly from 0 to 100% in first hour and it is reduced afterwards by half every 5 hour
Returns:
* Return list of levels for past 24 hour using 1h resolution


### ERD MODEL AVAILABLE 