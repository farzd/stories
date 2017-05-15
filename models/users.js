module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        facebookID: DataTypes.STRING,
        name: DataTypes.STRING,
        username: DataTypes.STRING,
        description: DataTypes.STRING,
        followers: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: true
        }
    });

    return User;
};