const mongoCredentials = {
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    database: process.env.MONGO_DATABASE
}
module.exports = {
    databases: {
        mongo: {            
            uri: 'mongodb://'+mongoCredentials.username+':'+mongoCredentials.password+'@'+mongoCredentials.database
        },
        mysql: {
            database: process.env.MYSQL_DATABASE,
            username: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            host: "localhost"
        }
    },
    jwt: {
        secret: process.env.SECRET_OR_KEY
    }
};