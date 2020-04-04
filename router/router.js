const router = require("express").Router();
const api = require("../api/api");
User = require("../model/User");

router.post("/register", api.create);
router.get("/list", api.getData);
router.put("/delete", api.deleteUser);
router.post("/login", api.login);

module.exports = router;
