const router = require("express").Router();
const User = require("../models/user");
const auth = require("./../middlewares/auth");
//user endpoints
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.get("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

//user registration
router.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const token = await newUser.generateAuthToken();
    res.json({ newUser, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/users/me", auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const requiredFields = ["name", "age", "email", "password"];
    const isValid = updates.every((update) => requiredFields.includes(update));
    if (!isValid) {
      return res.status(400).send({ error: "Invalid Updation Fields" });
    }
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.send(error);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    var token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(400).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});
module.exports = router;
