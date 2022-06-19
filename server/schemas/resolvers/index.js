const clientResolvers = require('./clientResolvers');
const usersResolvers = require('./userResolvers');

const resolvers = {
    Query: {
        ...usersResolvers.Query,
        ...clientResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...clientResolvers.Mutation
    }
}

module.exports = resolvers;