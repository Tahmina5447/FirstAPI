const express = require("express");
const router = express.Router();
const usersController = require("./../../controllers/userControllers");

router.route("/all")
.get(usersController.getAllUsers);

router.route("/save")  
.post(usersController.addUser);

router.route("/random")
.get(usersController.getRandomUser);

router.route("/update/:Id")
.patch(usersController.updateUser)

router.route("/bulk-update")
.patch(usersController.updateMany);

router.route("/delete/:Id")
.delete(usersController.deleteUser)  
  
module.exports = router;