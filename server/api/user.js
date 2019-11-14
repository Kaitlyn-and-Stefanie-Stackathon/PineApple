const router = require("express").Router();
const { User } = require("../db/models");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll(); // do we want all the info? or just a little...(decide if we need to set some attributes)
    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
