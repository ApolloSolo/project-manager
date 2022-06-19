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
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
});

const Project = model("Project", projectSchema);

module.exports = Project;
