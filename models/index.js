const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config');
const {database: { dbname, username, password, host}} = config;
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
    users: sequelize.import(path.join(__dirname, './users')),
    stories: sequelize.import(path.join(__dirname, './stories')),
    storyfragments: sequelize.import(path.join(__dirname, './storyfragments')),
    comments: sequelize.import(path.join(__dirname, './comments'))
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
        }).then(()=> {
            createUsers();
        });
    });
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


function createUsers() {
  const today = new Date();
  today.setHours(0,0,0,0);
  const todayVal = today.valueOf();
  sequelize.models.users.bulkCreate([{
    name: 'David',
    username: 'david001',
    facebookID: '001',
    description: 'robot model #1',
    followers: [2]
  }, {
    name: 'Walter',
    username: 'walter001',
    facebookID: '002',
    description: 'robot model #2',
    followers: [1]
  }, {
    name: 'Elizabeth',
    username: 'liz',
    facebookID: '003',
    description: 'shes real',
    followers: [1,2],
    following: [1,2]
  }]).then(() => {
    return sequelize.models.users.findAll();
  }).then((users) => {
    return sequelize.models.stories.bulkCreate([{
      date: todayVal,
      userId: users[0].id,
      likedby: [2]
    },{
      date: todayVal,
      userId: users[1].id,
      likedby: [2]
    },{
      date: todayVal,
      userId: users[2].id,
      likedby: [1,2]
    }]).then((story)=> { 
      return sequelize.models.storyfragments.bulkCreate([{
            date: todayVal,
            storyId: 1,
            url: 'http://www.google.com/',
            viewedby: [1,2]
          },{
            date: todayVal,
            storyId: 1,
            url: 'http://www.google.com/',
            viewedby: [1,2]
          }]);
    }).then((story)=> {
        test();
    });
  });
}

function test() { //findOne
  

}

