# Assignment 8

   A small Express API that stores items in an in-memory array.
   Data resets when the server restarts.

   ## Setup
       npm install
       npm start
   Server runs on http://localhost:3000

# Testing while server is active run these commands:


$ curl -i http://localhost:3000/api/resources


$ curl -i http://localhost:3000/api/resources/1


$ curl -i http://localhost:3000/api/resources/99


$ curl -i -X POST http://localhost:3000/api/resources -H "Content-Type: application/json" -d {"name":"Keyboard","price":75}


$ curl -i -X PUT http://localhost:3000/api/resources/1 -H "Content-Type: application/json" -d {"price":899}


$ curl -i -X DELETE http://localhost:3000/api/resources/2


$ curl -i -X DELETE http://localhost:3000/api/resources/2


