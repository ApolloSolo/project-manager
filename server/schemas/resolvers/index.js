const clientResolvers = require('./clientResolvers');
const projectResolvers = require('./projectResolvers');
const usersResolvers = require('./userResolvers');

const resolvers = {
    Query: {
        ...usersResolvers.Query,
        ...clientResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...clientResolvers.Mutation,
        ...projectResolvers.Mutation
    }
}

module.exports = resolvers;