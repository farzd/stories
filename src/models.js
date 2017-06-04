const path = require('path');
const Sequelize = require('sequelize');
const config = require('./utils/config');
const { database: { dbname, username, password, host} } = config;
const sequelize = new Sequelize(dbname, username, password, {
  host: host,
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

let db = {
    users: sequelize.import(path.join(__dirname, '/users/models')),
    stories: sequelize.import(path.join(__dirname, '/stories/models')),
    storyfragments: sequelize.import(path.join(__dirname, '/storyfragments/models')),
    comments: sequelize.import(path.join(__dirname, '/comments/models'))
};

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.connect = function () {
    return sequelize.authenticate().then(()=> {
        return sequelize.sync({
            force: true
        });
    });
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;