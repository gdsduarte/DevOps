import { Sequelize } from "sequelize";

const db = new Sequelize('DevOps_Calendar', 'root', 'gds437',{
    host: 'localhost',
    dialect: 'mysql',
    logging: function (query) {
        console.log(`Executing query: ${query}`);
    }
});

db.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        return db.query('SELECT 1+1 AS result');
    })
    .then(result => {
        console.log(`Query result: ${result[0][0].result}`);
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });

export default db;