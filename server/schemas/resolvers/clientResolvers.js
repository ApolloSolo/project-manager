const { User, Client, Project } = require("../../models/index");
const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const { validateClientAddition } = require("../../utils/validators");

module.exports = {
  Query: {
    getClients: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("Errors", {
          errors: { auth: "Not an authorized user" },
        });
      }
      const clients = await Client.find().populate("projects");
      return clients;
    },
  },

  Mutation: {
    // Updates user to contain ref to new client
    addClient: async (parent, { managerEmail, clientName }, context) => {
      const { valid, errors } = validateClientAddition(
        managerEmail,
        clientName
      );
      if (!context.user) {
        throw new AuthenticationError("Errors", {
          errors: { auth: "Not an authorized user" },
        });
      }
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const client = await Client.findOne({ name: clientName });
      if (client) {
        throw new UserInputError("This client already exists", {
          errors: {
            client: "This client already exists",
          },
        });
      }
      const newClient = await Client.create({
        name: clientName,
        manager: managerEmail,
      });
      const manager = await User.findOneAndUpdate(
        { email: managerEmail },
        { $addToSet: { clients: newClient._id } },
        { new: true }
      );
      if (!manager) {
        throw new UserInputError("This manager does not exist yet", {
          errors: {
            manager: "This manager does not exist yet",
          },
        });
      }
      return newClient;
    },

    updateClientManager: async (
      parent,
      { managerEmail, clientName },
      context
    ) => {
      const { valid, errors } = validateClientAddition(
        managerEmail,
        clientName
      );
      if (!context.user) {
        throw new AuthenticationError("Errors", {
          errors: { auth: "Not an authorized user" },
        });
      }
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // Get client data before changing manager (need old manager email)
      const preClientUpdate = await Client.findOne({ name: clientName });

      // Find old manager and remove client from their array
      const oldManager = await User.findOneAndUpdate(
        { email: preClientUpdate.manager },
        { $pullAll: { clients: [preClientUpdate._id] } }
      );

      // Update client to have new manager
      const client = await Client.findOneAndUpdate(
        { name: clientName },
        { manager: managerEmail },
        { new: true }
      );
      if (!client) {
        throw new UserInputError("This client does not exist", {
          errors: {
            client: "This client does not exist",
          },
        });
      }

      // Update new manager to inclued client - end of transfer
      const manager = await User.findOneAndUpdate(
        { email: managerEmail },
        { $addToSet: { clients: client._id } },
        { new: true }
      );

      if (!manager) {
        throw new UserInputError("This manager does not exist yet", {
          errors: {
            manager: "This manager does not exist yet",
          },
        });
      }
      return client;
    },
  },
};
