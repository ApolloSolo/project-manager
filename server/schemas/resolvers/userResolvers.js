const { User } = require("../../models/index");
const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");
const { signToken } = require("../../utils/auth");

module.exports = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({_id: context.user._id}).select("-__v -password");

        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },

    // Get all users
    getUsers: async (parent, args, context) => {
      return User.find();
    },
  },

  Mutation: {
    register: async (parent, args) => {
      const { valid, errors } = validateRegisterInput(
        args.username,
        args.email,
        args.password,
        args.confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const foundUsername = await User.findOne({ username: args.username });
      const foundUserEmail = await User.findOne({ email: args.email });

      if (foundUsername) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }

      if (foundUserEmail) {
        throw new UserInputError("Email is taken", {
          errors: {
            email: "This email is taken",
          },
        });
      }

      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    // LOGIN USER
    login: async (parent, { email, password }) => {
      const { valid, errors } = validateLoginInput(email, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      // Check to see if user email exists
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials", {
          errors: {
            credentials: "Your credentials are sus",
          },
        });
      }

      // Validate password
      const isPassword = await user.isCorrectPassword(password);

      // If wrong password, throw error
      if (!isPassword) {
        throw new AuthenticationError("Incorrect credentials", {
          errors: {
            credentials: "Your credentials are sus",
          },
        });
      }

      // If all valide, return user & token
      const token = signToken(user);
      return { token, user };
    },
  },
};
