const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
const Contacts = mongoose.model("Contacts", contactSchema);
module.exports = Contacts;
