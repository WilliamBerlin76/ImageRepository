# Image Repository

 - This project is an image repository created for the Shopify Backend Internship application

 - This api allows users to create an account, log in, upload up to three images at once as long as they are smaller than 1 MB, and remove multiple images at once

 - This api is hosted publicly at https://wb-image-repo.herokuapp.com/
 - There is also a client side web application connected to this api deployed here: https://personal-image-repository.netlify.app/
    - here is the link to the github repository for the client side web app: https://github.com/WilliamBerlin76/image-repo-frontend

 - Link to api documentation: https://documenter.getpostman.com/view/9286163/TzRRE8o5
    - Please use this documentation as a reference for using this api


## Instructions for running locally:
 - clone this repository on your local machine
 - create a `.env` file with the following variables:
    ```
    PORT=5000
    DB_ENV=development
    JWT_SECRET
    DB_USER
    DB_PASSWORD
    DB_DEV_DATABASE=imageRepository
    ```
 - use `pgAdmin` to create a local database called imageRepository with the same DB credentials from the `.env` file 
 - run `knex migrate:latest` to create the tables in the Postgres database
 - run `npm install` to install all dependencies
 - run `npm run server` or `npm start` to run the server