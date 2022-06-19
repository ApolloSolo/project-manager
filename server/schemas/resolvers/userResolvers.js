const { User } = require("../../models/index");
const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");

module.exports = {
  Query: {
    getUsers: async (parent, args, context) => {
      return User.find();
    },
  },

  Mutation: {
    register: async (parent, args) => {
        console.log(args)
        const foundUser = await User.findOne({email: args.email});

        if(foundUser) {
            throw new UserInputError("This email is currently in use.")
        }
        const user = await User.create(args);
        return user;
    }
  }
};
