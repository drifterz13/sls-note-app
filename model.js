const mongoose = require("mongoose");

const NoteModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = {
  NoteModel: mongoose.model("NoteModel", NoteModel),
};
