# Purple Barn Owl: A mock application using Express + Sequelize ORM + MySQL

This application and README assume you have Node.js V.16+ and a running MySQL instance to connect to.

## Install

```
git clone https://github.com/ikietzman/purple_barn_owl.git
cd purplebarnowl
npm install
```

Change the username, password, host, and port in the connection string in db_connection.js as needed.

Load the sample data:
```
node ./db/sampleData
```

Fire up the dev server:
```
node app
```
Or
```
nodemon app
```

## Endpoints

- GET /sites -- returns all sites associated with the authenticated user  
- GET /site/:siteid -- returns a single site associated with the authenticated user  
- GET /site/:site/process/:processid -- returns a single process from a single site associated with the authenticated user  
- POST /flags -- creates a new flag associated with the authenticated user, single site, and single process  

## Notes

In order to authenticate properly to use the application you will need to manually set some cookies. They are:

- userID  
- userToken  
- trustedDeviceID  
- applicationIP  

The userID, userToken, and trustedDeviceID will be subjected to some authentication/authorization middleware, so you may need to look into the database to decide what combinations are appropriate to user together.

The applicationIP goes through a separate piece of middleware which checks that 1) the application IP exists in the database, 2) the application at that IP is not compromised, and 3) the application at that IP is currently available. Again, this must match data found in the database.

----------------------------

A sample curl POST request is provided in curl_request.txt for your convenience.
