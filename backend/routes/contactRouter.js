const router = require("express").Router();
const {
  addContact,
  allContacts,
  deleteContact,
  editContact,
} = require("../controller/contact");

router.get("/contacts/:userId", allContacts);
router.post("/addcontact/:userId", addContact);
router.put("/editcontact/:id", editContact);
router.delete("/deletecontact/:id", deleteContact);

module.exports = router;
