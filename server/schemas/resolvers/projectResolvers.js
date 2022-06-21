const { User, Client, Project } = require("../../models/index");
const { UserInputError, AuthenticationError } = require("apollo-server-express");
const {
  validateProjectAddition,
  validateAssetAddition,
} = require("../../utils/validators");

const catchAsync = require("../../utils/catchAsync");

module.exports = {
  Mutation: {
    addProject: async (parent, { clientName, siteId, subContractor }, context) => {
  
      const { valid, errors } = validateProjectAddition(
        clientName,
        siteId,
        subContractor
      );

      if (!context.user) {
        throw new AuthenticationError("Errors", { errors: {auth: "Not an authorized user"} });
      }

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const newProject = await Project.create({ siteId, subContractor });
      if (!newProject) {
        throw new UserInputError("Could not create project at this time", {
          errors: {
            project: "Could not create project at this time",
          },
        });
      }

      const client = await Client.findOneAndUpdate(
        { name: clientName },
        { $addToSet: { projects: newProject._id } },
        { new: true }
      );
      if (!client) {
        throw new UserInputError("Could not update client at this time", {
          errors: {
            client: "Could not update client at this time",
          },
        });
      }

      return client.populate("projects");
    },

    addAsset: async (parent, { siteId, asset, volume }, context) => {
      const { valid, errors } = validateAssetAddition(siteId, asset, volume);

      if (!context.user) {
        throw new AuthenticationError("Errors", { errors: {auth: "Not an authorized user"} });
      }

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const project = await Project.findOneAndUpdate(
        { siteId },
        { $push: { assets: { asset, volume } } },
        { new: true }
      );

      if (!project) {
        throw new UserInputError(
          "Could not update project assets at this time",
          {
            errors: {
              project: "Could not update project assets at this time",
            },
          }
        );
      }
      return project;
    },
  },
};
