const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
  siteId: {
    type: String,
    required: true,
  },
  assets: [
    {
      asset: {
        type: String,
      },
      volume: {
        type: Number,
      },
    },
  ],
  subContractor: {
    type: String,
  },
});

const Project = model("Project", projectSchema);

module.exports = Project;
