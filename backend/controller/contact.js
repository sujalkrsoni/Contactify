const ContactList = require("../models/contact");

module.exports.allContacts = async (req, res) => {
  try {
    const userId = req.params.userId; // Get the userId from the request parameters

    // Find all contacts where the owner matches the userId and populate the "owner" field
    const contacts = await ContactList.find({ owner: userId }).populate(
      "owner",
      "name email"
    );

    // Return the found contacts
    res.status(200).send(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res
      .status(500)
      .send({ message: "Error fetching contacts", error: error.message });
  }
};

module.exports.addContact = async (req, res) => {
  try {
    let userId = req.params.userId;
    let { name, phone, email } = req.body;
    console.log(name, phone, email);
    const newContact = new ContactList({
      name: name,
      phone: phone,
      email: email,
    });
    newContact.owner = userId;
    await newContact.save();
    res.status(200).json({ message: "sucessfully added contact list !" });
  } catch (error) {
    res.status(400).json({ message: "Internal server error" });
  }
};

module.exports.deleteContact = async (req, res) => {
  try {
    const id = req.params.id; // Extract the id from params
    console.log(id);

    // Delete the contact by ID
    const result = await ContactList.findByIdAndDelete(id);

    // Check if the document was found and deleted
    if (!result) {
      return res.status(404).json({ message: "Contact not found!" });
    }

    res.status(200).json({ message: "Successfully deleted!" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the contact." });
  }
};

module.exports.editContact = async (req, res) => {
  const id = req.params.id;
  const { name, phone, email } = req.body;
  console.log(id);
  console.log(name, phone, email);
  await ContactList.findByIdAndUpdate(id, {
    name: name,
    phone: phone,
    email: email,
    _id: id,
  });
  res.status(200).json({ message: "updated !" });
};
