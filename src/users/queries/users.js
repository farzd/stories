const { sequelize: { models } } = require('../../models');
const UserType = require('../type');
const { GraphQLList, GraphQLNonNull, GraphQLInt } = require('graphql');
const { resolver } = require('graphql-sequelize');

module.exports = {
    type: new GraphQLList(UserType),
    name: 'Users',
    args: {
        id: {
            description: 'ID of the user',
            type: new GraphQLList(GraphQLInt)
        }
    },
    resolve: resolver(models.users)
}