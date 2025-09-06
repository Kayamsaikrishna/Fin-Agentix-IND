
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres', 'postgres', 'mysecretpassword', {
    host: 'localhost',
    dialect: 'postgres',
});

const testDbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

export { sequelize, testDbConnection };
