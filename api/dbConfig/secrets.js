require('dotenv').load();

let MONGO_DB ; 


if (process.env.NODE_ENV == 'production'){
    MONGO_DB = process.env.MONGODB_PROD;
    BASEURL = process.env.API_BASE_URL_PROD
}
else{
    MONGO_DB = process.env.MONGODB_DEV,
    BASEURL = process.env.API_BASE_URL
}

module.exports = {
    DATABASE: MONGO_DB, 
    BASEURL: BASEURL
}