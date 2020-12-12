## About

The stock-market project is a NodeJS web application that listens to clients for http requests and processes them to query or modify stock market data that is available in the database. The database used in this application is MongoDB. The framework used for this web application is ExpressJs.

## Running the application

One of the main external dependencies of this web application is a connection to a MongoDB database. The first iteration of this web application currently assumes that localhost:27017 offers connection to MongoDB. This will be enhanced in later versions to rely upon command line arguments or environmental variables as needed.

Assuming this dependency is met, here are the general steps to get the web application up and running:
- `npm i` # install the node dependencies
- `npm start` # start the web application and listen to the default port of 3000
- `http://localhost:3000/market/top_five_stocks`

Hardcode user accounts:
- `regular` `regularpassword`
- `admin` `adminpassword`
